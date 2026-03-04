const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.devashish.design/navi-mutual-fund-support', {waitUntil: 'networkidle2'});
  const html = await page.content();
  fs.writeFileSync('navi_rendered.html', html);
  await browser.close();
  console.log('done');
})();
