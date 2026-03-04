const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  
  await page.goto('http://localhost:3000/work/john-deere', {waitUntil: 'networkidle2'});
  
  // Hero
  await page.screenshot({path: 'public/test_jd_hero_v2.png'});

  // Scroll to Core Findings
  await page.evaluate(() => {
    window.scrollBy(0, 900);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'public/test_jd_findings.png'});

  // Scroll to Persona
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'public/test_jd_persona.png'});

  // Scroll to Mockup
  await page.evaluate(() => {
    window.scrollBy(0, 1400);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'public/test_jd_mockup.png'});

  await browser.close();
  console.log("Screenshots captured");
})();
