const { promisify } = require('util');

const get = require('lodash/get');
const got = require('got');
const minimist = require('minimist');
const inquirer = require('inquirer');
const xml2js = require('xml2js');
const open = require('open');
const invariant = require('invariant');

const { print, error } = require('./log');
const sources = require('./sources');
const help = require('./help');
const removeQueryString = require('./utils/removeQueryString');

const pkg = require('../package.json');

const handleUnexpected = err => {
  error(`An unexpected error occurred!\n  ${err.stack} ${err.stack}`);
  process.exit(1);
};

const handleRejection = err => {
  if (err) {
    if (err instanceof Error) {
      handleUnexpected(err);
    } else {
      error(`An unexpected rejection occurred\n  ${err}`);
    }
  } else {
    error('An unexpected empty rejection occurred');
  }
  process.exit(1);
};

process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);

const parseString = promisify(xml2js.parseString);

const sourceQuestion = {
  type: 'list',
  name: 'source',
  message: "Please choose which source's news you want to receive.",
  choices: Object.keys(sources),
  filter: val => val,
};

const getTitleQuestion = (titles, pageSize = 5) => ({
  type: 'list',
  name: 'title',
  message: 'Please choose which title you want to open',
  choices: titles,
  filter: val => val,
  pageSize,
});

const readNews = async (source, pageSize = 5) => {
  print(`Trying to fetch the ${source}'s latest news...`);
  const src = await get(sources, source);
  const rss = await got(src.rss);
  const result = await parseString(rss.body);
  const items = {};

  result.rss.channel[0].item.slice(0, pageSize).forEach(item => {
    const [title] = item.title;
    const [link] = item.link;
    items[title] = link;
  });

  const titleAnswer = await inquirer.prompt([
    getTitleQuestion(Object.keys(items), pageSize),
  ]);

  const url = items[titleAnswer.title];
  open(removeQueryString(url));
};

const checkSource = async source => {
  const src = await get(sources, source);
  invariant(src, `The source \`${source}\` is not in the sources!`);
};

const main = async argv => {
  if (argv.v || argv.version || argv._[0] === 'version') {
    console.log(pkg.version);
    process.exit(0);
  }

  if (argv.h || argv.help) {
    help();
    process.exit(0);
  }

  let source;
  let pageSize;

  if (argv._[0]) {
    [source, pageSize] = argv._;
  } else {
    const answer = await inquirer.prompt([sourceQuestion]);
    source = answer.source;
  }

  try {
    await checkSource(source);
    await readNews(source, pageSize);
  } catch (e) {
    error('Something goes wrong..');
    error(e.message);
  }

  process.exit();
};

main(minimist(process.argv.slice(2))).catch(handleUnexpected);
