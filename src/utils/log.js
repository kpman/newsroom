const chalk = require('chalk');
const figures = require('figures');

const log = (msg, { color = 'blue', icon = 'pointer' } = {}) => {
  console.log(`${chalk[color](figures[icon])} ${msg}`);
};

const print = (msg) => log(msg, { color: 'green' });

const warn = (msg) => log(msg, { color: 'yellow', icon: 'warning' });

const error = (msg) => log(msg, { color: 'red', icon: 'cross' });

module.exports = {
  log,
  print,
  warn,
  error,
};
