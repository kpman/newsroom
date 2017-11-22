const chalk = require('chalk');

const parseOpml = require('./opml');

module.exports = async () => {
  const sources = await parseOpml();
  const sourcesTitle = sources.map(s => s.title);

  console.log(`
    ${chalk.cyan('$ newsroom')}

      Enter an interactive mode to choose your source.

    ${chalk.cyan('$ newsroom <source> <number>')}

    ${chalk.dim('Source:')}

      Choose one of the following source:
      ${sourcesTitle.join(', ')}

    ${chalk.dim('Number:')}

      The amount you want to see at a time. The default is 5.

    ${chalk.dim('Options:')}

      -o    The path of your own OPML file. More about OPML format -> http://dev.opml.org/

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Get hackernews

      ${chalk.cyan('$ newsroom hackernews')}

    ${chalk.dim('-')} Get 10 latest TechCrunch news

      ${chalk.cyan('$ newsroom techcrunch 10')}

    ${chalk.dim('-')} Use my own OPML file

      ${chalk.cyan('$ newsroom -o ./my-awesome-list.opml')}
  `);
};
