const inquirer = require('inquirer');

const pkg = require('../package.json');

const checkForUpdates = require('./utils/checkForUpdates');
const { error } = require('./utils/log');
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
    console.log(help);
    await help();
    process.exit(0);
  }

  const customOpmlPath = argv.o;
  const sources = await parseOpml(customOpmlPath);

  let source;
  let pageSize;

  if (argv._[0]) {
    [source, pageSize] = argv._;
  } else {
    const sourcesTitle = sources.map(s => s.title);
    const askSource = getSourceQuestion(sourcesTitle);
    inquirer.registerPrompt(
      'autocomplete',
      require('inquirer-autocomplete-prompt')
    );
    const answer = await inquirer.prompt([askSource]);
    source = answer.source;
  }

  try {
    await readNews(source, sources, pageSize);
  } catch (e) {
    error('Something goes wrong..');
    error(e.message);
    process.exit(1);
  }

  process.exit(0);
};

module.exports = main;
