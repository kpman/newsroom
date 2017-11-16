jest.mock('inquirer');
jest.mock('../utils/checkForUpdates');
jest.mock('../opml');
jest.mock('../readNews');
jest.mock('../help');

const minimist = require('minimist');

const main = require('../main');
const pkg = require('../../package.json');

let inquirer;
let checkForUpdates;
let parseOpml;
let readNews;
let help;

const _processExit = process.exit;
const _consoleLog = console.log;

beforeEach(() => {
  inquirer = require('inquirer');
  inquirer.prompt.mockReturnValue(Promise.resolve({ source: 'hackernews' }));
  checkForUpdates = require('../utils/checkForUpdates');
  parseOpml = require('../opml');
  parseOpml.mockImplementation(() =>
    Promise.resolve([{ title: 'hackernews' }])
  );
  readNews = require('../readNews');
  help = require('../help');
  process.exit = jest.fn();
  console.log = jest.fn();
});

afterEach(() => {
  process.exit = _processExit;
  console.log = _consoleLog;
});

describe('#main', () => {
  describe('check for update', () => {
    it('should work fine', async () => {
      process.argv = ['node', 'bin/cli.js'];
      await main(minimist(process.argv.slice(2)));
      expect(checkForUpdates).toBeCalled();
    });
  });

  describe('version', () => {
    it('exit after call --version', async () => {
      process.argv = ['node', 'bin/cli.js', '--version'];
      await main(minimist(process.argv.slice(2)));
      expect(console.log).toBeCalledWith(pkg.version);
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call -v', async () => {
      process.argv = ['node', 'bin/cli.js', '-v'];
      await main(minimist(process.argv.slice(2)));
      expect(console.log).toBeCalledWith(pkg.version);
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call version', async () => {
      process.argv = ['node', 'bin/cli.js', 'version'];
      await main(minimist(process.argv.slice(2)));
      expect(console.log).toBeCalledWith(pkg.version);
      expect(process.exit).toBeCalledWith(0);
    });
  });

  describe('help', () => {
    it('exit after call --help', async () => {
      process.argv = ['node', 'bin/cli.js', '--help'];
      await main(minimist(process.argv.slice(2)));
      expect(help).toBeCalled();
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call -h', async () => {
      process.argv = ['node', 'bin/cli.js', '-h'];
      await main(minimist(process.argv.slice(2)));
      expect(help).toBeCalled();
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call help', async () => {
      process.argv = ['node', 'bin/cli.js', 'help'];
      await main(minimist(process.argv.slice(2)));
      expect(help).toBeCalled();
      expect(process.exit).toBeCalledWith(0);
    });
  });

  describe('#parseOpml', () => {
    it('should parse -o option', async () => {
      process.argv = ['node', 'bin/cli.js', '-o', './test.opml'];
      await main(minimist(process.argv.slice(2)));
      expect(parseOpml).toBeCalledWith('./test.opml');
    });
  });

  describe('#readNews', () => {
    it('should handle error', async () => {
      readNews.mockImplementation(() =>
        Promise.reject(new Error('Fake fail in test'))
      );
      process.argv = ['node', 'bin/cli.js'];
      await main(minimist(process.argv.slice(2)));
      expect(process.exit).toBeCalledWith(1);
    });

    it('should parse source', async () => {
      readNews.mockImplementation(() => Promise.resolve());
      process.argv = ['node', 'bin/cli.js', 'hackernews'];
      await main(minimist(process.argv.slice(2)));
      expect(readNews).toBeCalledWith(
        'hackernews',
        [{ title: 'hackernews' }],
        undefined
      );
      expect(process.exit).toBeCalledWith(0);
    });
  });
});
