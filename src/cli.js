const minimist = require('minimist');

const main = require('./main');

main(minimist(process.argv.slice(2)))
  .then(console.log)
  .catch(console.error);

process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  if (chunk === '\u001b') {
    // ESC
    process.exit(0);
  }
});
