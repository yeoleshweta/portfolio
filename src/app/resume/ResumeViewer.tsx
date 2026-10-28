'use client';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { CONSENT_EVENT, EVENTS, track } from '@/lib/analytics';
import styles from './resume.module.css';
import { Suspense } from 'react';
function Viewer() {
 const params=useSearchParams(); const loaded=useRef(false);
 const raw=params.get('from');const location=['navbar','hero','contact_section'].includes(raw??'')?raw!:'direct';
 const report=()=>{if(loaded.current)track(EVENTS.RESUME_VIEWED,{location,resume_version:'ux-researcher'});};
 useEffect(()=>{window.addEventListener(CONSENT_EVENT,report);return()=>window.removeEventListener(CONSENT_EVENT,report);});
 return <section className={styles.page}><div className={styles.header}><div><p className={styles.kicker}>SHWETA SHARMA</p><h1>Résumé</h1><p>UX research, behavioral analytics, and data science.</p></div><a className={styles.download} href="/api/resume/download" download="Shweta_Sharma_Resume.pdf" data-track="resume_downloaded" data-track-location={location} data-track-resume-version="ux-researcher">Download PDF</a></div><iframe className={styles.viewer} title="Shweta Sharma résumé PDF" src="/assets/UX_Researcher_Resume.pdf" onLoad={()=>{loaded.current=true;report();}}/><p className={styles.fallback}>PDF not displaying? <a href="/assets/UX_Researcher_Resume.pdf" target="_blank" rel="noreferrer">Open it in a new tab</a>.</p></section>;
}
export default function ResumeViewer(){return <Suspense><Viewer/></Suspense>;}
