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
let openFn;
let ora;
let readNews;
let succeed;

jest.mock('thenify');
jest.mock('inquirer');
jest.mock('open');
jest.mock('ora');
jest.mock('../utils/log');

beforeEach(async () => {
  inquirer = await import('inquirer');
  inquirer.prompt.mockReturnValue(
    Promise.resolve({
      title: ['NBA-GO'],
    })
  );

  thenify = await import('thenify');
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

  ora = await import('ora');
  ora.mockReturnValue({
    start: jest.fn(() => ({
      succeed,
    })),
  });

  openFn = (await import('open')).default;
  readNews = (await import('../readNews')).default;
  succeed = jest.fn();
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
    expect(openFn).toBeCalledWith(
      'https://news.ycombinator.com/item?id=15642276'
    );
  });
});
