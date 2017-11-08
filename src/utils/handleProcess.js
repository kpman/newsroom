const { error } = require('./log');

const handleUnexpected = err => {
  error(`An unexpected error occurred!\n  ${err.stack} ${err.stack}`);
  process.exit(1);
};

const handleRejection = err => {
  if (err) {
    if (err instanceof Error) {
      handleUnexpected(err);
    } else {
      error(`An unexpected rejection occurred\n  ${err}`);
    }
  } else {
    error('An unexpected empty rejection occurred');
  }
  process.exit(1);
};

module.exports = {
  handleUnexpected,
  handleRejection,
};
