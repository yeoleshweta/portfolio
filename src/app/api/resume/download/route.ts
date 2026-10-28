import { readFile } from 'node:fs/promises';
import path from 'node:path';
export async function GET() {
 const file=await readFile(path.join(process.cwd(),'public/assets/UX_Researcher_Resume.pdf'));
 return new Response(file,{headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="Shweta_Sharma_Resume.pdf"','Cache-Control':'public, max-age=3600'}});
}
