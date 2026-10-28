import { cleanParams, publicPath, type AnalyticsBatch, type AnalyticsEventName, type Params } from './contract';

const BROWSER_KEY='sw_analytics_browser';
const VISIT_KEY='sw_analytics_visit';
export const EXCLUDE_KEY='sw_analytics_excluded';
const IDLE_MS=30*60*1000;
type StorageLike=Pick<Storage,'getItem'|'setItem'|'removeItem'>;
export type CollectorEnvironment={enabled:boolean;storage:StorageLike;now:()=>number;uuid:()=>string;consented:()=>boolean;path:()=>string;referrer:()=>string;campaign:()=>Record<string,string>;send:(batch:AnalyticsBatch,signal:AbortSignal)=>Promise<boolean>};
type Envelope={batch:AnalyticsBatch;created:number;attempts:number};
/** Adapts the reference visitorAnalytics heartbeat/identity pattern, with separate visits. */
export class AnalyticsCollector {
  private browserId=''; private visitId=''; private lastActive=0;
  private queue:Envelope[]=[]; private inFlight=false; private generation=0;
  private controller=new AbortController();
  constructor(private env:CollectorEnvironment) {}
  private read(key:string) { try{return this.env.storage.getItem(key);}catch{return null;} }
  private write(key:string,value:string) {try{this.env.storage.setItem(key,value);}catch{/* storage disabled */}}
  private allowed() {
    try { publicPath(this.env.path()); return this.env.enabled && this.env.consented() && this.read(EXCLUDE_KEY)!=='true'; }
    catch{return false;}
  }
  reset() {
    this.generation++;this.controller.abort();this.controller=new AbortController();this.queue=[];
    this.browserId='';this.visitId='';this.lastActive=0;
    for(const key of [BROWSER_KEY,VISIT_KEY]) try{this.env.storage.removeItem(key);}catch{/* private browsing */}
  }
  private identify() {
    this.browserId=this.read(BROWSER_KEY)||this.browserId||this.env.uuid();
    this.write(BROWSER_KEY,this.browserId);
    try {
      const stored=JSON.parse(this.read(VISIT_KEY)||'null');
      if(stored && typeof stored.id==='string' && typeof stored.lastActive==='number' && this.env.now()-stored.lastActive<IDLE_MS) {this.visitId=stored.id;this.lastActive=stored.lastActive;}
    }catch{/* invalid storage */}
    if(!this.visitId || this.env.now()-this.lastActive>=IDLE_MS) this.visitId=this.env.uuid();
    this.lastActive=this.env.now();this.write(VISIT_KEY,JSON.stringify({id:this.visitId,lastActive:this.lastActive}));
  }
  collect(name:AnalyticsEventName,params:Params) {
    if(!this.allowed()) { if(!this.env.consented()) this.reset(); return; }
    this.identify();
    const path=publicPath(typeof params.page_path === "string" ? params.page_path : this.env.path());
    let envelope=this.queue[this.queue.length-1];
    if(!envelope || envelope.batch.visitId!==this.visitId || envelope.batch.events.length>=25) {
      envelope={batch:{browserId:this.browserId,visitId:this.visitId,path,referrer:this.env.referrer(),campaign:this.env.campaign(),events:[]},created:this.env.now(),attempts:0};
      this.queue.push(envelope);
    }
    envelope.batch.path=path;
    envelope.batch.events.push({id:this.env.uuid(),name,path,params:cleanParams(params),at:new Date(this.env.now()).toISOString()});
    if(this.queue.length>8) this.queue.shift(); // bounded memory, never persist behavior logs
  }
  async flush(heartbeat=false) {
    if(!this.allowed()) { if(!this.env.consented() || this.read(EXCLUDE_KEY)==='true') this.reset(); return; }
    if(this.inFlight) return;
    this.queue=this.queue.filter(e=>this.env.now()-e.created<IDLE_MS && e.attempts<4);
    if(!this.queue.length && heartbeat) {this.identify();this.queue.push({batch:{browserId:this.browserId,visitId:this.visitId,path:publicPath(this.env.path()),referrer:this.env.referrer(),campaign:this.env.campaign(),events:[]},created:this.env.now(),attempts:0});}
    const envelope=this.queue[0];if(!envelope)return;
    // Snapshot so events arriving in flight aren't removed with this batch.
    this.queue.shift();this.inFlight=true;
    const generation=this.generation;envelope.attempts++;
    try {
      const ok=await this.env.send(structuredClone(envelope.batch),this.controller.signal);
      if(!ok && generation===this.generation && this.allowed() && envelope.attempts<4) this.queue.unshift(envelope);
    }catch {if(generation===this.generation && this.allowed() && envelope.attempts<4) this.queue.unshift(envelope);}
    finally{this.inFlight=false;}
  }
}
let collector:AnalyticsCollector|undefined;
export function browserCollector() {
  if(typeof window==='undefined')return undefined;
  if(!collector) collector=new AnalyticsCollector({
    enabled:process.env.NEXT_PUBLIC_ANALYTICS_ENABLED==='true',
    storage:{getItem:k=>window.localStorage.getItem(k),setItem:(k,v)=>window.localStorage.setItem(k,v),removeItem:k=>window.localStorage.removeItem(k)},
    now:()=>Date.now(),uuid:()=>crypto.randomUUID(),consented:()=>{try{return window.localStorage.getItem('sw_consent_v1')==='granted';}catch{return inMemoryConsent==='granted';}},
    path:()=>window.location.pathname,referrer:()=>document.referrer,
    campaign:()=>Object.fromEntries([...new URLSearchParams(window.location.search)].filter(([k])=>['utm_source','utm_medium','utm_campaign','utm_content'].includes(k))),
    send:async(batch,signal)=>{const response=await fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(batch),keepalive:true,signal});return response.ok || (response.status>=400 && response.status<500 && response.status!==429);},
  });
  return collector;
}
let inMemoryConsent:string|null=null;
export function setCollectorConsent(choice:string) {inMemoryConsent=choice;if(choice!=='granted')browserCollector()?.reset();}
