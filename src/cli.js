const minimist = require('minimist');

const main = require('./main');
const { error } = require('./utils/log');
const handleEscKeypress = require('./utils/handleEscKeypress');

handleEscKeypress();

main(minimist(process.argv.slice(2)))
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    error(e);
    process.exit(1);
  });
