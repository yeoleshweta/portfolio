import { analyticsDatabase, secretMatches } from '@/lib/analytics/server';
export async function GET(request: Request) {
  if (!secretMatches(request.headers.get('authorization'),process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : undefined)) return new Response(null,{status:401});
  const db=analyticsDatabase();
  if(!db) return Response.json({error:'Analytics is not configured'},{status:503});
  const {error}=await db.rpc('prune_analytics');
  return Response.json({ok:!error},{status:error?503:200,headers:{'Cache-Control':'no-store'}});
}
