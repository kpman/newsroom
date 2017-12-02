const thenify = require('thenify');
const open = require('open');
const invariant = require('invariant');
const inquirer = require('inquirer');
const feed = thenify(require('feed-read-parser'));
const cheerio = require('cheerio');
const ora = require('ora');

const checkSource = require('./utils/checkSource');
const { getTitleQuestion } = require('./questions');

module.exports = async (source, sources, pageSize = 10) => {
  invariant(source, 'The source is not defined');
  checkSource(source, sources);

  const spinner = ora(`Trying to fetch the ${source}'s latest news...`).start();

  const targetSource = sources.find(s => s.title === source);

  invariant(targetSource, 'The source is not found');

  const isCuratedCo = /issues\.rss/.test(targetSource.feedUrl); // check the feed is made by https://curated.co

  const articles = await feed(targetSource.feedUrl);

  const maxCommonPrefixLength = 80;
  const commonPrefixIndex = articles
    .slice(0, pageSize)
    .reduce((prefixIndex, article, idx) => {
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

  let articleMap = {};

  articles.slice(0, pageSize).forEach(article => {
    const { title, link } = article;
    articleMap[title.slice(commonPrefixIndex)] = link;
  });

  spinner.succeed();

  let titleAnswer = await inquirer.prompt([
    getTitleQuestion(Object.keys(articleMap), pageSize),
  ]);

  if (isCuratedCo) {
    articleMap = {};
    const regex = new RegExp(titleAnswer.title);
    articles.forEach(article => {
      if (regex.test(article.title)) {
        const $ = cheerio.load(article.content);
        // eslint-disable-next-line func-names
        $('h4 a').each(function() {
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

  const url = articleMap[titleAnswer.title];

  open(url);
};
