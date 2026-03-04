const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  
  // Wait a moment for Next.js to start before navigating
  await new Promise(r => setTimeout(r, 5000));
  
  await page.goto('http://localhost:3000/work/design-thinking', {waitUntil: 'networkidle2'});
  
  // screenshot hero
  await page.screenshot({path: 'public/test_hero.png'});
  
  // screenshot chart
  const chartElement = await page.$('#define');
  if (chartElement) {
    await page.evaluate((el) => {
      // scroll to just above the element to get it and the heading in view
      window.scrollTo(0, el.offsetTop - 100);
    }, chartElement);
    await page.waitForTimeout(1000);
    await page.screenshot({path: 'public/test_chart.png'});
  }
  
  // screenshot persona
  await page.evaluate(() => {
    window.scrollBy(0, 800);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({path: 'public/test_persona.png'});
  
  await browser.close();
  console.log("Screenshots captured");
})();
