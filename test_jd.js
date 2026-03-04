const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  
  // screenshot homepage
  await page.goto('http://localhost:3000', {waitUntil: 'networkidle2'});
  
  // scroll down to "Featured Work" section
  const featuredElement = await page.$('#work');
  if (featuredElement) {
    await page.evaluate((el) => {
      window.scrollTo(0, el.offsetTop - 50);
    }, featuredElement);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: 'public/test_homepage_jd.png'});
  } else {
    // fallback scroll
    await page.evaluate(() => {
      window.scrollBy(0, 800);
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: 'public/test_homepage_jd.png'});
  }
  
  // Navigate to John Deere page
  await page.goto('http://localhost:3000/work/john-deere', {waitUntil: 'networkidle2'});
  
  // screenshot hero
  await page.screenshot({path: 'public/test_jd_hero.png'});
  
  // screenshot tables
  await page.evaluate(() => {
    window.scrollBy(0, 800);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'public/test_jd_table.png'});
  
  await browser.close();
  console.log("Screenshots captured");
})();
