// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { assert, count } = require("console");
const { chromium } = require("playwright");
const { title } = require("process");

async function sortHackerNewsArticles() {
  const totalNumberOfArticlesPerPage = 29; //30 articles per page, zero based
  const firstOneHundredArticles = 100;
  const numberOfPagesToGoThrough = 4;
  let arrayOfArticlesPublishedTimes = [];
  let pageCount = 0;
  let totalNumberOfArticlesIncrementedThrough = 0;

  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  async function GetArticlePublishedTimeInSeconds(counter) 
  {
    time = await page.locator('.age').nth(counter).getAttribute('title');
    timeSplit = time.split(" ");
    return timeSplit[1];
  }

  async function GoToNextPage()
  {
    await page.getByRole('link', { name: 'More', exact: true }).click();
  }

  // go to Hacker News
  await page.goto(('https://news.ycombinator.com/newest'));
  while(pageCount < numberOfPagesToGoThrough)
  {
    let currentPageArticleCount = 0;
    while(currentPageArticleCount <= totalNumberOfArticlesPerPage && totalNumberOfArticlesIncrementedThrough < firstOneHundredArticles)
    {
      arrayOfArticlesPublishedTimes.push(await GetArticlePublishedTimeInSeconds(currentPageArticleCount));
      currentPageArticleCount++;
      totalNumberOfArticlesIncrementedThrough++;
    }
    await GoToNextPage();
    pageCount++;
  }
  await browser.close();
  for(let i = 0; i < arrayOfArticlesPublishedTimes.length - 1; i++)
  {
    assert(parseInt(arrayOfArticlesPublishedTimes[i]) >= parseInt(arrayOfArticlesPublishedTimes[i+1]), "Articles are not published from newest to oldest");
  }
}

(async () => {
  await sortHackerNewsArticles();
})();


