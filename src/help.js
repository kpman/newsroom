const chalk = require('chalk');

const parseOpml = require('./opml');

module.exports = async () => {
  const sources = await parseOpml('./sources.opml');
  const sourcesTitle = sources.map(s => s.title);

  console.log(`
    $ newsroom

      Enter an interactive mode to choose your source.

    $ newsroom <source> <number>

    ${chalk.dim('Source:')}

      Choose one of the following source:
      ${sourcesTitle.join(', ')}

    ${chalk.dim('Number:')}

      The amount you want to see at a time. The default is 5.

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Get hackernews

      ${chalk.cyan('$ newsroom hackernews')}

    ${chalk.dim('-')} Get 10 latest TechCrunch news

      ${chalk.cyan('$ newsroom techcrunch 10')}
  `);
};
