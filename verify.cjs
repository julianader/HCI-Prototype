const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  // Navigate to the registration page
  await page.click('button:text("Next")');

  await page.screenshot({ path: 'registration_page.png', fullPage: true });
  await browser.close();
})();
