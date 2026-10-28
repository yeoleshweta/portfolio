/** Shared allowlisted telemetry contract. Never accept arbitrary visitor fields. */
export const EVENT_NAMES = [
  'page_view', 'cv_download', 'contact_click', 'social_click', 'project_card_click',
  'case_study_view', 'case_study_section_view', 'case_study_complete', 'scroll_depth',
  'nav_click', 'carousel_scroll', 'engaged_time', 'easter_egg_play', 'consent_update',
  'resume_viewed', 'resume_downloaded', 'resume_shared', 'page_engagement',
  'case_study_gate_view', 'case_study_unlock', 'outbound_click',
] as const;
export type AnalyticsEventName = typeof EVENT_NAMES[number];
export type Params = Record<string, string | number | boolean | undefined>;
export type CollectedEvent = { id: string; name: AnalyticsEventName; path: string; params: Params; at?: string };
export type AnalyticsBatch = { browserId: string; visitId: string; path: string; referrer?: string; campaign?: Record<string,string>; events: CollectedEvent[] };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PARAMS = new Set(['page_type','project_slug','project_title','project_tag','card_group','card_position','location','section_id','section_label','section_index','section_count','percent_scrolled','seconds','duration_sec','time_on_page_sec','method','network','link_domain','link_label','link_href','direction','feature','consent_state','file_name','file_extension','resume_version']);
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected object');
  return value as Record<string,unknown>;
}
export function publicPath(value: unknown): string {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.length > 1000) throw new Error('Invalid path');
  const path = value.split(/[?#]/)[0];
  if (/^\/(admin|api)(\/|$)/.test(path) || /[\\\u0000-\u001f]/.test(path)) throw new Error('Excluded path');
  return path;
}
export function cleanParams(value: unknown): Params {
  const out: Params = {};
  if (!value || typeof value !== 'object' || Array.isArray(value)) return out;
  for (const [key,val] of Object.entries(value)) {
    if (!PARAMS.has(key)) continue;
    if (typeof val === 'string') {
      if (key === 'link_href') { try { out[key] = publicPath(val); } catch { /* never store query strings or mailto addresses */ } }
      else out[key] = val.slice(0,160);
    } else if (typeof val === 'boolean') out[key] = val;
    else if (typeof val === 'number' && Number.isFinite(val) && val >= 0 && val <= 86400) out[key] = val;
  }
  return out;
}
export function parseBatch(input: unknown): AnalyticsBatch {
  const data = object(input);
  if (typeof data.browserId !== 'string' || !UUID.test(data.browserId) || typeof data.visitId !== 'string' || !UUID.test(data.visitId)) throw new Error('Invalid identifiers');
  if (!Array.isArray(data.events) || data.events.length > 25) throw new Error('Too many events');
  const events = data.events.map((raw): CollectedEvent => {
    const event = object(raw);
    if (typeof event.id !== 'string' || !UUID.test(event.id) || !EVENT_NAMES.includes(event.name as AnalyticsEventName)) throw new Error('Invalid event');
    const result: CollectedEvent = {id:event.id,name:event.name as AnalyticsEventName,path:publicPath(event.path),params:cleanParams(event.params)};
    if (typeof event.at === 'string') {
      const at = Date.parse(event.at);
      if (!Number.isFinite(at) || at < Date.now()-86400000 || at > Date.now()+60000) throw new Error('Invalid event time');
      result.at = new Date(at).toISOString();
    }
    return result;
  });
  let referrer: string | undefined;
  if (typeof data.referrer === 'string') { try { const url = new URL(data.referrer); if (/^https?:$/.test(url.protocol)) referrer = url.hostname.slice(0,200); } catch { /* discard */ } }
  const campaign: Record<string,string> = {};
  if (data.campaign && typeof data.campaign === 'object') for (const [key,value] of Object.entries(data.campaign)) {
    if (['utm_source','utm_medium','utm_campaign','utm_content'].includes(key) && typeof value === 'string') campaign[key] = value.slice(0,100);
  }
  return {browserId:data.browserId,visitId:data.visitId,path:publicPath(data.path),referrer,campaign,events};
}
