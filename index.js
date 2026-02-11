// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto(('https://news.ycombinator.com/newest'));
  await page.getByRole('link', { name: 'minutes ago' }).first().click();
  await page.getByRole('link', { name: 'minutes ago' }).nth(1).click();
  await page.getByRole('link', { name: 'More' }).click();
  await page.getByRole('link', { name: '41 minutes ago' }).nth(2).click();
  await page.getByRole('link', { name: 'More' }).click();
  await page.getByRole('link', { name: 'More', exact: true }).click();
  await page.locator('tr:nth-child(29) > .subtext > .subline > .age > a').click();
  await page.locator('tr:nth-child(29) > .subtext > .subline > .age > a').click();
}

(async () => {
  await sortHackerNewsArticles();
})();
