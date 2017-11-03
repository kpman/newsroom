const chalk = require('chalk');

const sources = require('./sources');

module.exports = () => {
  console.log(`
    $ newsroom

      Enter an interactive mode to choose your source.

    $ newsroom <source> <number>

    ${chalk.dim('Source:')}

      Choose one of the following source:
      ${Object.keys(sources).join(', ')}

    ${chalk.dim('Number:')}

      The amount you want to see at a time. The default is 5.

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Get wanqu news

      ${chalk.cyan('$ newsroom wanqu')}

    ${chalk.dim('-')} Get 7 latest TechCrunch news

      ${chalk.cyan('$ newsroom techcrunch 7')}
  `);
};
