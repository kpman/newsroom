/* eslint-disable no-await-in-loop */
const inquirer = require('inquirer');

const pkg = require('../package.json');

const checkForUpdates = require('./utils/checkForUpdates');
const checkSource = require('./utils/checkSource');
const { getSourceQuestion } = require('./questions');
const help = require('./help');
const getSourcesInfo = require('./opml');
const readNews = require('./readNews');

const main = async argv => {
  checkForUpdates();

  if (argv.v || argv.version || argv._[0] === 'version') {
    console.log(pkg.version);
    return process.exit(0);
  }

  if (argv.h || argv.help || argv._[0] === 'help') {
    await help();
    return process.exit(0);
  }

  const sourcePath = argv.o;
  const sourcesInfo = await getSourcesInfo(sourcePath);

  let source;
  let pageSize;
  let loop = true;

  while (loop) {
    if (argv._[0]) {
      [source, pageSize] = argv._;
    } else {
      inquirer.registerPrompt(
        'autocomplete',
        require('inquirer-autocomplete-prompt')
      );

      const sourcesTitle = sourcesInfo.map(sourceInfo => sourceInfo.title);
      const answer = await inquirer.prompt([getSourceQuestion(sourcesTitle)]);
      source = answer.source;
    }

    checkSource(source, sourcesInfo);

    const targetSourceInfo = sourcesInfo.find(
      sourceInfo => sourceInfo.title === source
    );

    loop = await readNews(targetSourceInfo, pageSize);
  }
};

module.exports = main;
