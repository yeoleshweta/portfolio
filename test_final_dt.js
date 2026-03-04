const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  
  await page.goto('http://localhost:3000/work/design-thinking', {waitUntil: 'networkidle2'});
  
  // scroll down to persona manually
  await page.evaluate(() => {
    window.scrollTo(0, 3200);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'public/test_final_persona.png'});

  // scroll down to micro learning
  await page.evaluate(() => {
    window.scrollBy(0, 1800);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'public/test_final_microlearning.png'});

  await browser.close();
  console.log("Screenshots captured");
})();
