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
