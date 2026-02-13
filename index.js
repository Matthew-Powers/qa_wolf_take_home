// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { assert, count } = require("console");
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

  //Check to see that the same article time is not being copied by comparing headlines
  async function CheckIfArticleTitlesAreTheSame(prevArticleTitle, curArticleTitle, counter)
  {
    if(totalArticleTimeCount > totalNumberOfArticles - 1)
      {
        if(prevArticleTitle == curArticleTitle)
        {
          counter++;
        }
      }
  }

  async function GetArticlePublishedTimeInSeconds(counter) 
  {
    time = await page.locator('.age').nth(counter).getAttribute('title');
    timeSplit = time.split(" ");
    return timeSplit[1];
  }

  async function AssertArticlesAreInOrder(publishedTimeArray, counter)
  {
    if(publishedTimeArray.length > 1)
    {
      assert(parseInt(publishedTimeArray[counter - 1]) >= parseInt(publishedTimeArray[counter]));
    }
  }

  async function GoToNextPage(articlesCounted, articlesPerPage)
  {
    if(articlesCounted >= articlesPerPage)
    {
      await page.getByRole('link', { name: 'More', exact: true }).click();
    }
  }

  async function GetArticleTimesAndAssertTheyAreInOrder()
  {
    while(numberOfPages < totalNumberOfPages)
    {
      articleTimeCount = 0
      while(articleTimeCount <= totalNumberOfArticles && totalArticleTimeCount < totalArticleCount)
      {
        currentArticleTitle = await GetArticleTitle(articleTimeCount);
        previousArticleTitle = await GetArticleTitle((articleTimeCount + 1) % totalNumberOfArticles + 1);
        await CheckIfArticleTitlesAreTheSame(previousArticleTitle, currentArticleTitle, articleTimeCount);
        articleTime.push(await GetArticlePublishedTimeInSeconds(articleTimeCount));
        await AssertArticlesAreInOrder(articleTime, totalArticleTimeCount);
        await GoToNextPage(articleTimeCount, totalNumberOfArticles);
        await articleTimeCount++;
        await totalArticleTimeCount++;
      }
      numberOfPages++;
    }
  }

  // go to Hacker News
  await page.goto(('https://news.ycombinator.com/newest'));
  await GetArticleTimesAndAssertTheyAreInOrder();
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();


