const { promisify } = require('util');

const get = require('lodash/get');
const got = require('got');
const minimist = require('minimist');
const inquirer = require('inquirer');
const xml2js = require('xml2js');
const Table = require('cli-table2');

const { print, error } = require('./log');
const source = require('./source');
const help = require('./help');
const removeQueryString = require('./utils/removeQueryString');

const pkg = require('../package.json');

const parseString = promisify(xml2js.parseString);

const sourceQuestion = {
  type: 'list',
  name: 'source',
  message: "Please choose which source's news you want to receive.",
  choices: ['bnext', 'inside'],
  filter: val => val.toLowerCase(),
};

const table = new Table();

const main = async argv => {
  if (argv.v || argv.version || argv._[0] === 'version') {
    console.log(pkg.version);
    process.exit(0);
  }

  if (argv.h || argv.help) {
    help();
    process.exit(0);
  }

  const answer = await inquirer.prompt([sourceQuestion]);
  const src = await get(source, answer.source);

  if (src) {
    print(`Trying to fetch the ${answer.source}'s latest news...`);
    const rss = await got(src.rss);
    const result = await parseString(rss.body);
    result.rss.channel[0].item.forEach(item => {
      table.push([`${item.title[0]}\n${removeQueryString(item.link[0])}`]);
    });
    console.log(table.toString());
  }
};

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

main(minimist(process.argv.slice(2))).catch(handleUnexpected);
