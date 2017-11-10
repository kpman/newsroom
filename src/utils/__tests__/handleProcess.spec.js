const { handleUnexpected, handleRejection } = require('../handleProcess');

jest.mock('../log');
const processExit = process.exit;
let error;

beforeEach(() => {
  error = require('../log').error;
  process.exit = jest.fn();
});

afterEach(() => {
  process.exit = processExit;
});

it('should be defined', () => {
  expect(handleUnexpected).toBeDefined();
  expect(handleRejection).toBeDefined();
});

describe('#handleUnexpected', () => {
  it('should call error and exit', () => {
    const err = new Error('gg');
    handleUnexpected(err);
    expect(process.exit).toBeCalledWith(1);
    expect(error).toBeCalledWith(
      `An unexpected error occurred!\n  ${err.stack}`
    );
  });
});

describe('#handleRejection', () => {
  it('should call handleUnexpected when error is an Error type', () => {
    const err = new Error('G.G');
    handleRejection(err);
    expect(process.exit).toBeCalledWith(1);
  });

  it('should call error when error is NOT an Error type', () => {
    const err = 'G.G';
    handleRejection(err);
    expect(error).toBeCalledWith(`An unexpected rejection occurred\n  G.G`);
    expect(process.exit).toBeCalledWith(1);
  });

  it('should call error when error is NOT defined', () => {
    handleRejection();
    expect(error).toBeCalledWith(`An unexpected empty rejection occurred`);
    expect(process.exit).toBeCalledWith(1);
  });
});
