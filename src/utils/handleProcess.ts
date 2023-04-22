import { error } from './log';

const handleUnexpected = (err) => {
  error(`An unexpected error occurred!\n  ${err.stack}`);
  process.exit(1);
};

const handleRejection = (err?: any) => {
  if (err) {
    if (err instanceof Error) {
      handleUnexpected(err);
    } else {
      error(`An unexpected rejection occurred\n  ${err}`);
    }
  } else {
    error('An unexpected empty rejection occurred');
  }

  return process.exit(1);
};

export { handleUnexpected, handleRejection };
