-- Upgrade the existing admin: enhanced reports and Google SMTP alert settings.
-- Does not send email or delete existing visits/events.
-- Transactional setup; preserves existing analytics data.
begin;
-- Enhanced reports preserve existing first-party data.
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
 'resumeViews',count(*) filter(where name='resume_viewed'),'resumeDownloads',count(*) filter(where name='resume_downloaded'),'resumeShares',count(*) filter(where name='resume_shared'),
 'newVisitors',(select count(distinct a.browser_id) from active a where not exists(select 1 from allowed old where old.browser_id=a.browser_id and old.first_seen_at<p_from) and not exists(select 1 from public.analytics_events e join allowed old on old.id=e.visit_id where old.browser_id=a.browser_id and e.occurred_at<p_from)),
 'returningVisitors',(select count(distinct a.browser_id) from active a where exists(select 1 from allowed old where old.browser_id=a.browser_id and old.first_seen_at<p_from) or exists(select 1 from public.analytics_events e join allowed old on old.id=e.visit_id where old.browser_id=a.browser_id and e.occurred_at<p_from)),
 'contactClicks',count(*) filter(where name='contact_click'),'reachedEnd',count(*) filter(where name='case_study_complete')) as val from ev
), series as (
 select date_trunc(case when p_to-p_from <= interval '2 days' then 'hour' else 'day' end,occurred_at) as bucket,
 count(*) filter(where name='page_view') as views,count(distinct visit_id) as visits,
 count(*) filter(where name='resume_viewed') as "resumeViews",count(*) filter(where name='resume_downloaded') as "resumeDownloads",count(*) filter(where name='resume_shared') as "resumeShares" from ev group by 1 order by 1
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
placements as (select coalesce(params->>'location','body') as label,count(*) filter(where name='resume_viewed') as views,count(*) filter(where name='resume_downloaded') as downloads,count(*) filter(where name='resume_shared') as shares from ev where name in ('resume_viewed','resume_downloaded','resume_shared') group by 1),
live as (select id,current_path,device,browser,last_seen_at from allowed where last_seen_at > now()-interval '2 minutes' order by last_seen_at desc limit 25)
select jsonb_build_object('totals',(select val from counts),'series',coalesce((select jsonb_agg(series) from series),'[]'),
 'cases',coalesce((select jsonb_agg(cases order by views desc) from cases),'[]'),
 'sections',coalesce((select jsonb_agg(sections) from sections),'[]'),
 'sources',coalesce((select jsonb_agg(sources) from sources),'[]'),'devices',coalesce((select jsonb_agg(devices) from devices),'[]'),
 'browsers',coalesce((select jsonb_agg(browsers) from browsers),'[]'),'pages',coalesce((select jsonb_agg(pages) from pages),'[]'),
 'campaigns',coalesce((select jsonb_agg(campaigns) from campaigns),'[]'),'placements',coalesce((select jsonb_agg(placements) from placements),'[]'),
 'funnel',jsonb_build_object('visits',(select count(*) from active),'caseStudies',(select count(distinct visit_id) from ev where name='case_study_view'),'resume',(select count(distinct visit_id) from ev where name='resume_viewed'),'downloads',(select count(distinct visit_id) from ev where name='resume_downloaded'),'shares',(select count(distinct visit_id) from ev where name='resume_shared'),'contacts',(select count(distinct visit_id) from ev where name='contact_click')),
 'live',coalesce((select jsonb_agg(live) from live),'[]'));
$$;

-- Per-admin preferences and durable Google SMTP delivery claims. No browser grants.
create table if not exists public.analytics_alert_settings (
 owner_id uuid primary key, email text not null, enabled boolean not null default false,
 period text not null default 'day' check(period in ('hour','day','week')),
 visitor_threshold integer check(visitor_threshold between 1 and 1000000),
 resume_threshold integer check(resume_threshold between 1 and 1000000),
 updated_at timestamptz not null default now(),
 check(not enabled or visitor_threshold is not null or resume_threshold is not null)
);
create table if not exists public.analytics_alert_deliveries (
 id uuid primary key default gen_random_uuid(),owner_id uuid not null references public.analytics_alert_settings(owner_id) on delete cascade,
 email text not null,kind text not null check(kind in ('visitors','resume_views')),period text not null,
 window_start timestamptz not null,observed_count bigint not null,threshold integer not null,
 status text not null default 'pending' check(status in ('pending','leased','sending','sent','failed','uncertain')),
 attempts integer not null default 0,claim_token uuid,locked_until timestamptz,next_attempt_at timestamptz not null default now(),
 detail text,created_at timestamptz not null default now(),updated_at timestamptz not null default now(),
 unique(owner_id,kind,period,window_start)
);
create index if not exists analytics_alert_deliveries_owner_time on public.analytics_alert_deliveries(owner_id,created_at desc);
alter table public.analytics_alert_settings enable row level security;
alter table public.analytics_alert_deliveries enable row level security;
revoke all on public.analytics_alert_settings,public.analytics_alert_deliveries from public,anon,authenticated;

create or replace function public.save_analytics_alert_settings(p_owner uuid,p_email text,p_enabled boolean,p_period text,p_visitors integer,p_resume integer)
returns void language sql security definer set search_path='' as $$
 insert into public.analytics_alert_settings(owner_id,email,enabled,period,visitor_threshold,resume_threshold)
 values(p_owner,p_email,p_enabled,p_period,p_visitors,p_resume)
 on conflict(owner_id) do update set email=excluded.email,enabled=excluded.enabled,period=excluded.period,visitor_threshold=excluded.visitor_threshold,resume_threshold=excluded.resume_threshold,updated_at=now();
 -- Invalidate claims that have not started SMTP. Sent/uncertain/sending records remain durable.
 update public.analytics_alert_deliveries set status='pending',claim_token=null,locked_until=null,attempts=0,next_attempt_at=now(),detail='Preferences changed; awaiting current-window evaluation.'
 where owner_id=p_owner and status in ('pending','leased','failed');
$$;
create or replace function public.analytics_alert_preferences(p_owner uuid)
returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object('settings',coalesce((select jsonb_build_object('enabled',enabled,'period',period,'visitors',visitor_threshold,'resumeViews',resume_threshold) from public.analytics_alert_settings where owner_id=p_owner),'{"enabled":false,"period":"day","visitors":25,"resumeViews":10}'::jsonb),
 'deliveries',coalesce((select jsonb_agg(d) from(select id,kind,period,window_start,observed_count,threshold,status,attempts,detail,created_at from public.analytics_alert_deliveries where owner_id=p_owner order by created_at desc limit 20)d),'[]'::jsonb));
$$;
create or replace function public.claim_analytics_alerts(p_now timestamptz default now())
returns jsonb language plpgsql security definer set search_path='' as $$
declare pref record; win timestamptz; n_visitors bigint;n_resume bigint;result jsonb;
begin
 if not pg_try_advisory_xact_lock(hashtextextended('portfolio-alert-check',0)) then return '[]'; end if;
 -- A worker that stopped during SMTP may have delivered the email. Never auto-resend it.
 update public.analytics_alert_deliveries set status='uncertain',detail='Sending was interrupted; delivery may have succeeded. No automatic resend.',updated_at=p_now where status='sending' and locked_until<p_now;
 for pref in select * from public.analytics_alert_settings where enabled loop
  win := date_trunc(pref.period,p_now at time zone 'UTC') at time zone 'UTC';
  select count(distinct v.browser_id) into n_visitors from public.analytics_visits v where not v.is_bot and not v.is_internal and ((v.first_seen_at<=p_now and v.last_seen_at>=win) or exists(select 1 from public.analytics_events e where e.visit_id=v.id and e.occurred_at>=win and e.occurred_at<=p_now));
  select count(*) into n_resume from public.analytics_events e join public.analytics_visits v on v.id=e.visit_id where not v.is_bot and not v.is_internal and e.name='resume_viewed' and e.occurred_at>=win and e.occurred_at<=p_now;
  if pref.visitor_threshold is not null and n_visitors>=pref.visitor_threshold then
   insert into public.analytics_alert_deliveries as existing(owner_id,email,kind,period,window_start,observed_count,threshold) values(pref.owner_id,pref.email,'visitors',pref.period,win,n_visitors,pref.visitor_threshold) on conflict(owner_id,kind,period,window_start) do update set threshold=excluded.threshold,observed_count=excluded.observed_count,email=excluded.email,status='pending',claim_token=null,locked_until=null,attempts=0,next_attempt_at=p_now where existing.status in ('pending','leased','failed') and (existing.threshold<>excluded.threshold or existing.email<>excluded.email);
  end if;
  if pref.resume_threshold is not null and n_resume>=pref.resume_threshold then
   insert into public.analytics_alert_deliveries as existing(owner_id,email,kind,period,window_start,observed_count,threshold) values(pref.owner_id,pref.email,'resume_views',pref.period,win,n_resume,pref.resume_threshold) on conflict(owner_id,kind,period,window_start) do update set threshold=excluded.threshold,observed_count=excluded.observed_count,email=excluded.email,status='pending',claim_token=null,locked_until=null,attempts=0,next_attempt_at=p_now where existing.status in ('pending','leased','failed') and (existing.threshold<>excluded.threshold or existing.email<>excluded.email);
  end if;
 end loop;
 with candidates as (
  select d.id from public.analytics_alert_deliveries d join public.analytics_alert_settings s on s.owner_id=d.owner_id
  where s.enabled and s.email=d.email and s.period=d.period and d.window_start=(date_trunc(s.period,p_now at time zone 'UTC') at time zone 'UTC') and d.threshold=case when d.kind='visitors' then s.visitor_threshold else s.resume_threshold end and d.attempts<3 and d.next_attempt_at<=p_now
  and ((d.status in ('pending','failed')) or(d.status='leased' and d.locked_until<p_now))
  order by d.created_at limit 20 for update of d skip locked
 ), claimed as (
  update public.analytics_alert_deliveries d set status='leased',claim_token=gen_random_uuid(),locked_until=p_now+interval '5 minutes',attempts=d.attempts+1,updated_at=p_now
  from candidates c where d.id=c.id returning d.*
 ) select coalesce(jsonb_agg(claimed),'[]') into result from claimed;
 return result;
end;
$$;
create or replace function public.start_analytics_alert(p_id uuid,p_token uuid)
returns boolean language plpgsql security definer set search_path='' as $$
begin
 update public.analytics_alert_deliveries d set status='sending',updated_at=now()
 where d.id=p_id and d.claim_token=p_token and d.status='leased' and d.locked_until>now()
 and exists(select 1 from public.analytics_alert_settings s where s.owner_id=d.owner_id and s.enabled and s.email=d.email and s.period=d.period and d.threshold=case when d.kind='visitors' then s.visitor_threshold else s.resume_threshold end);
 return found;
end;
$$;
create or replace function public.finish_analytics_alert(p_id uuid,p_token uuid,p_status text,p_detail text,p_retry boolean default false)
returns void language plpgsql security definer set search_path='' as $$
begin
 if p_status not in ('sent','failed','uncertain') then raise exception 'Invalid status';end if;
 update public.analytics_alert_deliveries set status=p_status,detail=left(p_detail,300),updated_at=now(),locked_until=null,
 next_attempt_at=case when p_status='failed' and p_retry then now()+interval '5 minutes' else 'infinity'::timestamptz end
 where id=p_id and claim_token=p_token and status in ('sending','leased');
end;
$$;
create or replace function public.prune_analytics() returns void language sql security definer set search_path='' as $$
 delete from public.analytics_events where occurred_at<now()-interval '400 days';
 delete from public.analytics_visits where last_seen_at<now()-interval '400 days';
 delete from public.analytics_rate_limits where bucket<now()-interval '1 hour';
 delete from public.analytics_alert_deliveries where created_at<now()-interval '400 days';
$$;
revoke all on function public.save_analytics_alert_settings(uuid,text,boolean,text,integer,integer),public.analytics_alert_preferences(uuid),public.claim_analytics_alerts(timestamptz),public.start_analytics_alert(uuid,uuid),public.finish_analytics_alert(uuid,uuid,text,text,boolean) from public,anon,authenticated;
grant execute on function public.save_analytics_alert_settings(uuid,text,boolean,text,integer,integer),public.analytics_alert_preferences(uuid),public.claim_analytics_alerts(timestamptz),public.start_analytics_alert(uuid,uuid),public.finish_analytics_alert(uuid,uuid,text,text,boolean) to service_role;


notify pgrst, 'reload schema';
commit;
