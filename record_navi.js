const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  await page.goto('https://www.devashish.design/navi-mutual-fund-support', {waitUntil: 'networkidle2'});
  
  // take a long full page screenshot
  await page.screenshot({path: 'navi_full.png', fullPage: true});
  await browser.close();
})();
