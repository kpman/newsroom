const updateNotifier = require('update-notifier');
const chalk = require('chalk');

const pkg = require('../../package.json');

module.exports = () => {
  const notifier = updateNotifier({ pkg });
  const { update } = notifier;

  if (!update) {
    return;
  }

  let message = `Update available! ${chalk.red(update.current)} → ${chalk.green(
    update.latest
  )} \n`;

  message += `Run ${chalk.magenta('npm i -g newsroom-cli')} to update!`;

  notifier.notify({ message, defer: false });
};
