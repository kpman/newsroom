const minimist = require('minimist');
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
    console.log(2);
    await readNews(source, sources, pageSize);
    console.log(2.5);
  } catch (e) {
    console.log(3);
    error('Something goes wrong..');
    error(e.message);
    process.exit(1);
    console.log(4);
  }

  process.exit(0);
};

main(minimist(process.argv.slice(2)));
