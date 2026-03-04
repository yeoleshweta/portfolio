import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            record_video_dir=".",
            record_video_size={"width": 1440, "height": 900},
            viewport={"width": 1440, "height": 900}
        )
        page = await context.new_page()
        await page.goto("https://www.devashish.design/navi-mutual-fund-support")
        
        # Scroll slowly down the page to capture everything
        for i in range(20):
            await page.mouse.wheel(0, 800)
            await page.wait_for_timeout(500)
            
        await context.close()
        await browser.close()
        print("Video saved.")

asyncio.run(main())
