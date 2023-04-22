import updateNotifier from 'update-notifier';
import chalk from 'chalk';

import pkg from '../package';

export default () => {
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
