// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { title } = require("process");

async function sortHackerNewsArticles() {
  articleTimeCount = 0;
  const articleTime = new Array;
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto(('https://news.ycombinator.com/newest'));
  while(articleTimeCount < 100)
  {
    articleTime.push(await page.locator('.age').nth(articleTimeCount).getAttribute('title'));
    if(articleTimeCount % 29 == 0 && articleTimeCount != 0)
    {
      await page.getByRole('link', { name: 'More', exact: true }).click();
      console.log(articleTimeCount);
    }
    articleTimeCount++;
  }
}

(async () => {
  await sortHackerNewsArticles();
})();
