-- Service-only visitor pagination, applying the same date/bot/internal filters as reports.
create or replace function public.analytics_visits_page(p_from timestamptz,p_to timestamptz,p_bots boolean,p_internal boolean,p_offset integer,p_limit integer,p_search text)
returns jsonb language sql stable security definer set search_path = '' as $$
with matching as (
 select v.*,(select count(*) from public.analytics_events e where e.visit_id=v.id and e.occurred_at>=p_from and e.occurred_at<p_to) as event_count
 from public.analytics_visits v where ((v.first_seen_at<p_to and v.last_seen_at>=p_from) or exists(select 1 from public.analytics_events e where e.visit_id=v.id and e.occurred_at>=p_from and e.occurred_at<p_to))
 and (p_bots or not v.is_bot) and (p_internal or not v.is_internal)
 and (coalesce(p_search,'')='' or position(lower(p_search) in lower(v.id::text||' '||v.current_path||' '||coalesce(v.referrer,'')||' '||v.browser_id::text))>0)
), selected as (select * from matching order by last_seen_at desc,id desc limit least(greatest(p_limit,1),5000) offset greatest(p_offset,0))
select jsonb_build_object('total',(select count(*) from matching),'rows',coalesce((select jsonb_agg(selected) from selected),'[]'));
$$;
revoke all on function public.analytics_visits_page(timestamptz,timestamptz,boolean,boolean,integer,integer,text) from public,anon,authenticated;
grant execute on function public.analytics_visits_page(timestamptz,timestamptz,boolean,boolean,integer,integer,text) to service_role;
-- PostgREST uses this grant for the server-only internal-traffic toggle. RLS still denies ordinary users.
grant select,update(is_internal) on public.analytics_visits to service_role;
