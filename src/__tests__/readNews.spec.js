const setup = ({ title }) => {
  const sources = [
    {
      title,
    },
  ];
  return { sources };
};

let print;
let thenify;
let inquirer;
let open;
let readNews;

jest.mock('thenify');
jest.mock('inquirer');
jest.mock('open');
jest.mock('../utils/log');

beforeEach(() => {
  print = require('../utils/log').print;
  inquirer = require('inquirer');
  inquirer.prompt.mockReturnValue(
    Promise.resolve({
      title: 'NBA-GO',
    })
  );
  thenify = require('thenify');
  thenify.mockReturnValue(() =>
    Promise.resolve([
      {
        title: 'NBA-GO',
        link: 'https://news.ycombinator.com/item?id=15642276',
      },
      {
        title: 'newsroom',
        link: 'https://github.com/kpman/newsroom',
      },
    ])
  );
  open = require('open');
  readNews = require('../readNews');
});

it('should be defined', () => {
  expect(readNews).toBeDefined();
});

describe('#readNews', () => {
  it('should throw when not pass source', async () => {
    expect.assertions(1);
    try {
      await readNews();
    } catch (e) {
      expect(e.message).toBe('The source is not defined');
    }
  });

  it('should call print from log utils', async () => {
    const { sources } = setup({ title: 'hackernews' });
    await readNews('hackernews', sources);
    expect(print).toBeCalledWith(
      `Trying to fetch the hackernews's latest news...`
    );
  });

  it('should call inquirer.prompt', async () => {
    const { sources } = setup({ title: 'hackernews' });
    await readNews('hackernews', sources);
    expect(inquirer.prompt.mock.calls[0][0][0].choices).toEqual([
      'NBA-GO',
      'newsroom',
    ]);
    expect(inquirer.prompt.mock.calls[0][0][0].pageSize).toBe(10);
    expect(inquirer.prompt.mock.calls[0][0][0].type).toBe('list');
  });

  it('should call open', async () => {
    const { sources } = setup({ title: 'hackernews' });
    await readNews('hackernews', sources);
    expect(open).toBeCalledWith(
      'https://news.ycombinator.com/item?id=15642276'
    );
  });
});
