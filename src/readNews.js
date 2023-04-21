const thenify = require('thenify');
const open = require('open');
const inquirer = require('inquirer');
const feed = thenify(require('feed-read-parser'));
const cheerio = require('cheerio');
const ora = require('ora');

const { getTitleQuestion } = require('./questions');

const getCommonPrefixIndex = (articles, maxCommonPrefixLength = 80) => {
  const commonPrefixIndex = articles.reduce((prefixIndex, article, idx) => {
    if (idx !== 0) {
      const currentStr = article.title;
      const prevStr = articles[idx - 1].title;
      for (let j = 0; j < prefixIndex; j += 1) {
        if (prevStr[j] !== currentStr[j]) {
          return j;
        }
      }
    }
    return prefixIndex;
  }, maxCommonPrefixLength);

  return commonPrefixIndex;
};

module.exports = async (sourceInfo, pageSize = 10) => {
  const spinner = ora(
    `Trying to fetch the ${sourceInfo.title}'s latest news...`
  ).start();

  const articles = (await feed(sourceInfo.feedUrl)).slice(0, pageSize);

  const commonPrefixIndex = getCommonPrefixIndex(articles);

  // {
  //   title1: url1,
  //   title2: url2,
  // }
  let articleMap = {};

  articles.forEach((article) => {
    const { title, link } = article;
    articleMap[title.slice(commonPrefixIndex)] = link;
  });

  spinner.succeed();

  let titleAnswer = await inquirer.prompt([
    getTitleQuestion(Object.keys(articleMap), pageSize),
  ]);

  // check the feed is made by https://curated.co
  const isCuratedCo = /issues\.rss/.test(sourceInfo.feedUrl);
  if (isCuratedCo) {
    articleMap = {};
    const regex = new RegExp(titleAnswer.title);

    articles.forEach((article) => {
      if (regex.test(article.title)) {
        const $ = cheerio.load(article.content);
        // eslint-disable-next-line func-names
        $('h4 a').each(function () {
          const title = $(this).text();
          const url = $(this).attr('href');
          articleMap[title] = url;
        });
      }
    });

    titleAnswer = await inquirer.prompt([
      getTitleQuestion(Object.keys(articleMap), pageSize),
    ]);
  }

  titleAnswer.title.forEach((title) => {
    open(articleMap[title]);
  });

  return true;
};
