const minimist = require('minimist');

const main = require('./main');
const { error } = require('./utils/log');

main(minimist(process.argv.slice(2)))
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    error(e);
    process.exit(1);
  });

process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  if (chunk === '\u001b') {
    // ESC
    process.exit(0);
  }
});
