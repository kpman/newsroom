const minimist = require('minimist');

const pkg = require('../package.json');

const main = async argv => {
  if (argv.v || argv.version || argv._[0] === 'version') {
    console.log(pkg.version);
    process.exit(0);
  }

  if (argv.h || argv.help) {
    console.log('help');
    process.exit(0);
  }
};

const handleUnexpected = err => {
  console.error(`An unexpected error occurred!\n  ${err.stack} ${err.stack}`);
  process.exit(1);
};

const handleRejection = err => {
  if (err) {
    if (err instanceof Error) {
      handleUnexpected(err);
    } else {
      console.error(`An unexpected rejection occurred\n  ${err}`);
    }
  } else {
    console.error('An unexpected empty rejection occurred');
  }
  process.exit(1);
};

process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);

main(minimist(process.argv.slice(2))).catch(handleUnexpected);
