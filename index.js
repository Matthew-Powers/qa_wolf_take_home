// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { title } = require("process");

async function sortHackerNewsArticles() {
  const articleTime = new Array;
  const totalNumberOfArticles = 29;
  numberOfPages = 0;
  const totalNumberOfPages = 4;
  totalArticleTimeCount = 0;
  const totalArticleCount = 100;
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto(('https://news.ycombinator.com/newest'));
  while(numberOfPages < totalNumberOfPages)
  {
    articleTimeCount = 0
    while(articleTimeCount <= totalNumberOfArticles && totalArticleTimeCount < totalArticleCount)
    {
      articleTime.push(await page.locator('.age').nth(articleTimeCount).getAttribute('title'));
      if(articleTimeCount % totalNumberOfArticles == 0 && articleTimeCount != 0)
      {
        await page.getByRole('link', { name: 'More', exact: true }).click();
      }
      articleTimeCount++;
      totalArticleTimeCount++;
    }
    numberOfPages++;
  }
}

(async () => {
  await sortHackerNewsArticles();
})();
