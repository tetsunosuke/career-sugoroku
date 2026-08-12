import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Reactハイドレーション待機
  await page.screenshot({ path: 'C:/Users/tetsu/.gemini/antigravity/brain/a59947f6-af75-41a6-abf4-819012e2111d/screenshot.png' });
  await browser.close();
  console.log('Screenshot captured successfully');
})();
