const minimist = require('minimist');

const main = require('./main');

main(minimist(process.argv.slice(2)))
  .then(console.log)
  .catch(console.error);
