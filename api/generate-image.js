const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent('<h1>Hello from Puppeteer</h1>');
  const buffer = await page.screenshot();

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
};
