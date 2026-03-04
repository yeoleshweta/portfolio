const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  
  await page.goto('http://localhost:3000/work/john-deere', {waitUntil: 'networkidle2'});
  
  // Hero
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'public/test_jd_hero_uxlaw.png'});

  await browser.close();
  console.log("Screenshots captured");
})();
