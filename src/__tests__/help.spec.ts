import help from '../help';

jest.mock('../opml');

let parseOpml;
const consoleLog = console.log;

beforeEach(() => {
  parseOpml = require('../opml');
  console.log = jest.fn();
});

afterEach(() => {
  console.log = consoleLog;
});

it('should be defined', () => {
  expect(help).toBeDefined();
});

describe('#help', () => {
  it('should call console.log', async () => {
    const sources = [{ title: 'hackernews' }];
    parseOpml.mockReturnValue(Promise.resolve(sources));

    await help();

    expect(console.log).toBeCalled();
  });
});
