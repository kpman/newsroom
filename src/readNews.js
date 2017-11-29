const thenify = require('thenify');
const open = require('open');
const invariant = require('invariant');
const inquirer = require('inquirer');
const feed = thenify(require('feed-read-parser'));
const cheerio = require('cheerio');

const { print } = require('./utils/log');
const checkSource = require('./utils/checkSource');
const { getTitleQuestion } = require('./questions');

module.exports = async (source, sources, pageSize = 10) => {
  invariant(source, 'The source is not defined');
  checkSource(source, sources);

  print(`Trying to fetch the ${source}'s latest news...`);

  const targetSource = sources.find(s => s.title === source);

  invariant(targetSource, 'The source is not found');

  const isCuratedCo = /issues\.rss/.test(targetSource.feedUrl); // check the feed is made by https://curated.co

  const articles = await feed(targetSource.feedUrl);

  let articleMap = {};

  articles.slice(0, pageSize).forEach(article => {
    const { title, link } = article;
    articleMap[title] = link;
  });

  let titleAnswer = await inquirer.prompt([
    getTitleQuestion(Object.keys(articleMap), pageSize),
  ]);

  if (isCuratedCo) {
    articleMap = {};
    articles.forEach(r => {
      if (r.title === titleAnswer.title) {
        const $ = cheerio.load(r.content);
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
