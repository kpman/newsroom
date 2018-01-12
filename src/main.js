const inquirer = require('inquirer');

const pkg = require('../package.json');

const checkForUpdates = require('./utils/checkForUpdates');
const { getSourceQuestion } = require('./questions');
const help = require('./help');
const parseOpml = require('./opml');
const readNews = require('./readNews');

const main = async argv => {
  await checkForUpdates();

  if (argv.v || argv.version || argv._[0] === 'version') {
    console.log(pkg.version);
    process.exit(0);
  }

  if (argv.h || argv.help || argv._[0] === 'help') {
    await help();
    process.exit(0);
  }

  const customOpmlPath = argv.o;
  const sources = await parseOpml(customOpmlPath);

  let source;
  let pageSize;
  let loop = true;

  while (loop) {
    if (argv._[0]) {
      [source, pageSize] = argv._;
    } else {
      const sourcesTitle = sources.map(s => s.title);
      const askSource = getSourceQuestion(sourcesTitle);
      inquirer.registerPrompt(
        'autocomplete',
        require('inquirer-autocomplete-prompt')
      );
      // eslint-disable-next-line no-await-in-loop
      const answer = await inquirer.prompt([askSource]);
      source = answer.source;
    }
    // eslint-disable-next-line no-await-in-loop
    loop = await readNews(source, sources, pageSize);
  }
};

module.exports = main;
