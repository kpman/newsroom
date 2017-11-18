const opml = require('../opml');

jest.mock('fs');

let fs;

beforeEach(() => {
  fs = require('fs');
  fs.readFileSync = jest.fn();
  fs.readFileSync.mockReturnValue({ toString: () => '<xml></xml>' });
  fs.existsSync = jest.fn();
});

it('should be defined', () => {
  expect(opml).toBeDefined();
});

describe('#opml', () => {
  it('should use absolute file path when file exists', async () => {
    fs.existsSync.mockReturnValue(true);
    const opmlpath = '/User/awesome.opml';
    await opml(opmlpath);
    expect(fs.readFileSync).toBeCalledWith('/User/awesome.opml');
  });

  it('should use relative file path', async () => {
    fs.existsSync.mockReturnValue(false);
    process.cwd = jest.fn(() => '/testonly');
    const opmlpath = './awesome.opml';
    await opml(opmlpath);
    expect(fs.readFileSync).toBeCalledWith('/testonly/awesome.opml');
  });

  it('should parse correctly', async () => {
    const opmlpath = 'awesome.opml';
    const result = await opml(opmlpath);
    expect(result).toMatchSnapshot();
  });

  it('should parse correctly with array', async () => {
    const opmlpath = 'awesome.opml';
    fs.readFileSync.mockReturnValue({
      toString: () => `
        <opml version="2.0">
          <body>
            <outline text="Subscriptions" title="Subscriptions">
              <outline xmlUrl="http://www.theverge.com/rss/index.xml" />
              <outline xmlUrl="https://techcrunch.com/feed/" />
              <outline xmlUrl="http://feeds.mashable.com/Mashable" />
              <outline xmlUrl="http://www.engadget.com/rss.xml" />
            </outline>
          </body>
        </opml>`,
    });
    const result = await opml(opmlpath);
    expect(result).toMatchSnapshot();
  });
});
