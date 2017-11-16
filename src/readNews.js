const thenify = require('thenify');
const open = require('open');
const invariant = require('invariant');
const inquirer = require('inquirer');

const { print } = require('./utils/log');
const checkSource = require('./utils/checkSource');
const { getTitleQuestion } = require('./questions');

module.exports = async (source, sources, pageSize = 10) => {
  invariant(source, 'The source is not defined');
  checkSource(source, sources);

  print(`Trying to fetch the ${source}'s latest news...`);

  const feed = thenify(require('feed-read-parser'));
  const src = sources.find(s => s.title === source);
  const result = await feed(src.feedUrl);

  const items = {};

  result.slice(0, pageSize).forEach(item => {
    const { title, link } = item;
    items[title] = link;
  });

  const titleAnswer = await inquirer.prompt([
    getTitleQuestion(Object.keys(items), pageSize),
  ]);

  const url = items[titleAnswer.title];

  open(url);
};
