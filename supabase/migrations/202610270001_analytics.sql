-- Analytics is accessed exclusively through validated Next.js routes.
-- No grants or RLS policies for anon/authenticated: admin reads use verified server APIs.
create table if not exists public.analytics_visits (
  id uuid primary key,
  browser_id uuid not null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  landing_path text not null,
  current_path text not null,
  referrer text,
  campaign jsonb not null default '{}',
  device text not null default 'Other',
  browser text not null default 'Other',
  os text not null default 'Other',
  is_bot boolean not null default false,
  is_internal boolean not null default false
);
create index if not exists analytics_visits_last_seen on public.analytics_visits(last_seen_at desc);
create index if not exists analytics_visits_browser on public.analytics_visits(browser_id);
create table if not exists public.analytics_events (
  id uuid primary key,
  visit_id uuid not null references public.analytics_visits(id) on delete cascade,
  name text not null,
  path text not null,
  params jsonb not null default '{}',
  occurred_at timestamptz not null default now(),
  received_at timestamptz not null default now()
);
create index if not exists analytics_events_time on public.analytics_events(occurred_at desc, id);
create index if not exists analytics_events_visit_time on public.analytics_events(visit_id, occurred_at desc);
create index if not exists analytics_events_name_time on public.analytics_events(name, occurred_at desc);
create table if not exists public.analytics_rate_limits (
  key text not null,
  bucket timestamptz not null,
  requests integer not null default 0,
  primary key (key,bucket)
);
alter table public.analytics_visits enable row level security;
alter table public.analytics_events enable row level security;
alter table public.analytics_rate_limits enable row level security;
revoke all on public.analytics_visits, public.analytics_events, public.analytics_rate_limits from anon, authenticated;

create or replace function public.ingest_analytics(p_batch jsonb, p_source text, p_dimensions jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare n integer; v_id uuid := (p_batch->>'visitId')::uuid; b_id uuid := (p_batch->>'browserId')::uuid;
begin
  if jsonb_array_length(p_batch->'events') > 25 then raise exception 'batch limit'; end if;
  insert into public.analytics_rate_limits(key,bucket,requests) values (p_source,date_trunc('minute',now()),1)
  on conflict(key,bucket) do update set requests=public.analytics_rate_limits.requests+1 returning requests into n;
  if n > 120 then raise exception 'Analytics rate limit exceeded'; end if;
  -- Serialize a visit's ingestion so concurrent writes cannot race the event limit.
  perform pg_advisory_xact_lock(hashtextextended(v_id::text,0));
  if exists(select 1 from public.analytics_visits where id=v_id and browser_id<>b_id) then raise exception 'Invalid visit'; end if;
  if (select count(*) from public.analytics_events where visit_id=v_id and received_at > now()-interval '1 minute') + jsonb_array_length(p_batch->'events') > 240 then raise exception 'Analytics rate limit exceeded'; end if;
  insert into public.analytics_visits(id,browser_id,landing_path,current_path,referrer,campaign,device,browser,os,is_bot)
  values(v_id,b_id,coalesce(p_batch->'events'->0->>'path',p_batch->>'path'),p_batch->>'path',p_batch->>'referrer',coalesce(p_batch->'campaign','{}'),p_dimensions->>'device',p_dimensions->>'browser',p_dimensions->>'os',coalesce((p_dimensions->>'isBot')::boolean,false))
  on conflict(id) do update set last_seen_at=now(),current_path=excluded.current_path;
  insert into public.analytics_events(id,visit_id,name,path,params,occurred_at)
  select (e->>'id')::uuid,v_id,e->>'name',e->>'path',coalesce(e->'params','{}'),coalesce((e->>'at')::timestamptz,now())
  from jsonb_array_elements(p_batch->'events') e on conflict(id) do nothing;
end;
$$;

create or replace function public.analytics_report(p_from timestamptz,p_to timestamptz,p_bots boolean default false,p_internal boolean default false)
returns jsonb language sql stable security definer set search_path = '' as $$
with allowed as (
 select * from public.analytics_visits where (p_bots or not is_bot) and (p_internal or not is_internal)
), ev as (
 select e.*,v.browser_id,v.referrer,v.device,v.browser,v.campaign from public.analytics_events e join allowed v on v.id=e.visit_id where e.occurred_at >= p_from and e.occurred_at < p_to
), active as (
 select distinct v.* from allowed v where (v.first_seen_at < p_to and v.last_seen_at >= p_from) or exists(select 1 from ev where ev.visit_id=v.id)
), counts as (
 select jsonb_build_object('visitors',(select count(distinct browser_id) from active),'visits',(select count(*) from active),
 'pageViews',count(*) filter(where name='page_view'),'caseViews',count(*) filter(where name='case_study_view'),
 'resumeViews',count(*) filter(where name='resume_viewed'),'resumeDownloads',count(*) filter(where name='resume_downloaded'),
 'contactClicks',count(*) filter(where name='contact_click'),'reachedEnd',count(*) filter(where name='case_study_complete')) as val from ev
), series as (
 select date_trunc(case when p_to-p_from <= interval '2 days' then 'hour' else 'day' end,occurred_at) as bucket,
 count(*) filter(where name='page_view') as views,count(distinct visit_id) as visits from ev group by 1 order by 1
), cases as (
 select path,count(*) filter(where name='case_study_view') as views,count(distinct browser_id) filter(where name='case_study_view') as readers,
 count(distinct visit_id) filter(where name='case_study_complete') as completed,
 coalesce(round(sum(case when jsonb_typeof(params->'duration_sec')='number' then greatest(0,least((params->>'duration_sec')::numeric,86400)) else 0 end) filter(where name='page_engagement')),0) as active_seconds
 from ev where path like '/work/%' group by path
), sections as (
 select path,params->>'section_label' as label,params->>'section_id' as section_id,count(distinct visit_id) as visits
 from ev where name='case_study_section_view' group by 1,2,3
), sources as (select coalesce(nullif(referrer,''),'Direct') as label,count(*) as count from active group by 1 order by 2 desc limit 10),
devices as (select device as label,count(*) as count from active group by 1 order by 2 desc),
browsers as (select browser as label,count(*) as count from active group by 1 order by 2 desc),
pages as (select path as label,count(*) as count from ev where name='page_view' group by 1 order by 2 desc limit 10),
campaigns as (select campaign->>'utm_campaign' as label,count(*) as count from active where campaign ? 'utm_campaign' group by 1 order by 2 desc limit 10),
placements as (select coalesce(params->>'location','body') as label,count(*) filter(where name='resume_viewed') as views,count(*) filter(where name='resume_downloaded') as downloads from ev where name in ('resume_viewed','resume_downloaded') group by 1),
live as (select id,current_path,device,browser,last_seen_at from allowed where last_seen_at > now()-interval '2 minutes' order by last_seen_at desc limit 25)
select jsonb_build_object('totals',(select val from counts),'series',coalesce((select jsonb_agg(series) from series),'[]'),
 'cases',coalesce((select jsonb_agg(cases order by views desc) from cases),'[]'),
 'sections',coalesce((select jsonb_agg(sections) from sections),'[]'),
 'sources',coalesce((select jsonb_agg(sources) from sources),'[]'),'devices',coalesce((select jsonb_agg(devices) from devices),'[]'),
 'browsers',coalesce((select jsonb_agg(browsers) from browsers),'[]'),'pages',coalesce((select jsonb_agg(pages) from pages),'[]'),
 'campaigns',coalesce((select jsonb_agg(campaigns) from campaigns),'[]'),'placements',coalesce((select jsonb_agg(placements) from placements),'[]'),
 'live',coalesce((select jsonb_agg(live) from live),'[]'));
$$;

create or replace function public.analytics_activity(p_from timestamptz,p_to timestamptz,p_bots boolean,p_internal boolean,p_kind text,p_offset integer,p_limit integer,p_search text,p_visit uuid default null)
returns jsonb language sql stable security definer set search_path = '' as $$
with allowed as (select * from public.analytics_visits where (p_bots or not is_bot) and (p_internal or not is_internal)),
matching as (
 select e.*,v.browser_id,v.device,v.browser,v.referrer from public.analytics_events e join allowed v on v.id=e.visit_id
 where e.occurred_at>=p_from and e.occurred_at<p_to and (p_visit is null or e.visit_id=p_visit)
 and (p_kind='events' or (p_kind='resumes' and e.name in ('resume_viewed','resume_downloaded','resume_shared')) or (p_kind='contacts' and e.name='contact_click') or (p_kind='cases' and e.path like '/work/%'))
 and (coalesce(p_search,'')='' or position(lower(p_search) in lower(e.name||' '||e.path||' '||e.visit_id::text))>0)
), selected as (select * from matching order by occurred_at desc,id desc limit least(greatest(p_limit,1),5000) offset greatest(p_offset,0))
select jsonb_build_object('total',(select count(*) from matching),'rows',coalesce((select jsonb_agg(selected) from selected),'[]'));
$$;

create or replace function public.prune_analytics() returns void language sql security definer set search_path = '' as $$
 delete from public.analytics_events where occurred_at < now()-interval '400 days';
 delete from public.analytics_visits where last_seen_at < now()-interval '400 days';
 delete from public.analytics_rate_limits where bucket < now()-interval '1 hour';
$$;

revoke all on function public.ingest_analytics(jsonb,text,jsonb),public.analytics_report(timestamptz,timestamptz,boolean,boolean),public.analytics_activity(timestamptz,timestamptz,boolean,boolean,text,integer,integer,text,uuid),public.prune_analytics() from public,anon,authenticated;
grant execute on function public.ingest_analytics(jsonb,text,jsonb),public.analytics_report(timestamptz,timestamptz,boolean,boolean),public.analytics_activity(timestamptz,timestamptz,boolean,boolean,text,integer,integer,text,uuid),public.prune_analytics() to service_role;
