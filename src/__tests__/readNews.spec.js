const setup = () => {
  const sourceInfo = {
    title: 'hackernews',
    url: undefined,
    feedUrl: 'https://news.ycombinator.com/rss',
    feedType: 'rss',
  };
  return { sourceInfo };
};

let thenify;
let inquirer;
let open;
let ora;
let readNews;
let succeed;

jest.mock('thenify');
jest.mock('inquirer');
jest.mock('open');
jest.mock('ora');
jest.mock('../utils/log');

beforeEach(() => {
  inquirer = require('inquirer');
  inquirer.prompt.mockReturnValue(
    Promise.resolve({
      title: ['NBA-GO'],
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
  succeed = jest.fn();
  ora = require('ora');
  ora.mockReturnValue({
    start: jest.fn(() => ({
      succeed,
    })),
  });
  open = require('open');
  readNews = require('../readNews');
});

it('should be defined', () => {
  expect(readNews).toBeDefined();
});

describe('#readNews', () => {
  it('should call ora to add spinner', async () => {
    const { sourceInfo } = setup();
    await readNews(sourceInfo);
    expect(ora).toBeCalledWith(
      `Trying to fetch the ${sourceInfo.title}'s latest news...`
    );
  });

  it('should call spinner succeed', async () => {
    const { sourceInfo } = setup();
    await readNews(sourceInfo);
    expect(succeed).toBeCalled();
  });

  it('should call inquirer.prompt', async () => {
    const { sourceInfo } = setup();
    await readNews(sourceInfo);
    expect(inquirer.prompt.mock.calls[0][0][0].choices).toEqual([
      'NBA-GO',
      'newsroom',
    ]);
    expect(inquirer.prompt.mock.calls[0][0][0].pageSize).toBe(10);
    expect(inquirer.prompt.mock.calls[0][0][0].type).toBe('checkbox');
  });

  it('should call open', async () => {
    const { sourceInfo } = setup();
    await readNews(sourceInfo);
    expect(open).toBeCalledWith(
      'https://news.ycombinator.com/item?id=15642276'
    );
  });
});
