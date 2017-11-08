const { promisify } = require('util');

const open = require('open');
const feed = promisify(require('feed-read-parser'));
const inquirer = require('inquirer');

const { print } = require('./utils/log');
const removeQueryString = require('./utils/removeQueryString');
const { getTitleQuestion } = require('./questions');

module.exports = async (source, pageSize = 5, sources) => {
  print(`Trying to fetch the ${source}'s latest news...`);
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
  open(removeQueryString(url));
};
