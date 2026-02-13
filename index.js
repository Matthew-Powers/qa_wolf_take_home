// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { assert } = require("console");
const { chromium } = require("playwright");
const { title } = require("process");

async function sortHackerNewsArticles() {
  const articleTime = new Array;
  const totalNumberOfArticles = 29;
  numberOfPages = 0;
  const totalArticleCount = 100;
  const totalNumberOfPages = 4;
  totalArticleTimeCount = 0;

  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  async function GetArticleTitle(counter)
  {
    return await page.locator('.titleline').nth(counter).innerText();
  }

  // go to Hacker News
  await page.goto(('https://news.ycombinator.com/newest'));
  while(numberOfPages < totalNumberOfPages)
  {
    articleTimeCount = 0
    while(articleTimeCount <= totalNumberOfArticles && totalArticleTimeCount < totalArticleCount)
    {
      currentArticleTitle = await GetArticleTitle(articleTimeCount);
      if(totalArticleTimeCount > totalNumberOfArticles - 1)
      {
        //Check to see that the same article time is not being copied by comparing headlines
        if(previousArticleTitle == currentArticleTitle)
        {
          articleTimeCount++;
        }
      }
      time = await page.locator('.age').nth(articleTimeCount).getAttribute('title');
      timeSplit = time.split(" ");
      articleTime.push(timeSplit[1]);
      if(articleTime.length > 1)
      {
        assert(parseInt(articleTime[totalArticleTimeCount - 1]) >= parseInt(articleTime[totalArticleTimeCount]));
      }
      if(articleTimeCount % totalNumberOfArticles == 0 && articleTimeCount != 0)
      {
        await page.getByRole('link', { name: 'More', exact: true }).click();
      }
      previousArticleTitle = await GetArticleTitle(articleTimeCount);
      articleTimeCount++;
      totalArticleTimeCount++;
    }
    numberOfPages++;
  }
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();


