const chalk = require('chalk');
const figures = require('figures');

const log = (msg, color = 'blue', icon = 'pointer') => {
  console.log(`${chalk[color](figures[icon])} ${msg}`);
};

const print = msg => log(msg, 'green');

const warn = msg => log(msg, 'yellow', 'warning');

const error = msg => log(msg, 'red', 'cross');

module.exports = {
  log,
  print,
  warn,
  error,
};
