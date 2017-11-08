const minimist = require('minimist');
const inquirer = require('inquirer');

const pkg = require('../package.json');

const checkForUpdates = require('./utils/checkForUpdates');
const checkSource = require('./utils/checkSource');
const { handleRejection, handleUnexpected } = require('./utils/handleProcess');
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
    await help();
    process.exit(0);
  }

  const opmlPath = argv.o ? argv.o : './sources.opml';
  const sources = await parseOpml(opmlPath);

  let source;
  let pageSize;

  if (argv._[0]) {
    [source, pageSize] = argv._;
  } else {
    const sourcesTitle = sources.map(s => s.title);
    const askSource = getSourceQuestion(sourcesTitle);
    const answer = await inquirer.prompt([askSource]);
    source = answer.source;
  }

  try {
    checkSource(source, sources);
    await readNews(source, pageSize, sources);
  } catch (e) {
    error('Something goes wrong..');
    error(e.message);
    process.exit(1);
  }

  process.exit(0);
};

process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);

main(minimist(process.argv.slice(2))).catch(handleUnexpected);
