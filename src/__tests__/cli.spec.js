jest.mock('inquirer');
jest.mock('../utils/checkForUpdates');
jest.mock('../opml');
jest.mock('../readNews');
jest.mock('../help');

let inquirer;
let checkForUpdates;
let parseOpml;
let readNews;

const _processExit = process.exit;
const _consoleLog = console.log;

const setup = async () => {
  await require('../cli');
};

beforeEach(() => {
  inquirer = require('inquirer');
  inquirer.prompt.mockReturnValue({ source: 'hackernews' });
  checkForUpdates = require('../utils/checkForUpdates');
  parseOpml = require('../opml');
  parseOpml.mockReturnValue(Promise.resolve([{ title: 'hackernews' }]));
  readNews = require('../readNews');
  process.exit = jest.fn();
  console.log = jest.fn();
});

afterEach(() => {
  process.exit = _processExit;
  console.log = _consoleLog;
  jest.resetModules();
});

describe('#cli', () => {
  describe('check update', () => {
    it('should work fine', async () => {
      process.argv = ['node', 'bin/cli.js'];
      await setup();
      expect(checkForUpdates).toBeCalled();
    });
  });

  describe('version', () => {
    it('exit after call --version', async () => {
      process.argv = ['node', 'bin/cli.js', '--version'];
      await setup();
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call -v', async () => {
      process.argv = ['node', 'bin/cli.js', '-v'];
      await setup();
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call version', async () => {
      process.argv = ['node', 'bin/cli.js', 'version'];
      await setup();
      expect(process.exit).toBeCalledWith(0);
    });
  });

  describe('help', () => {
    it('exit after call --help', async () => {
      process.argv = ['node', 'bin/cli.js', '--help'];
      await setup();
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call -h', async () => {
      process.argv = ['node', 'bin/cli.js', '-h'];
      await setup();
      expect(process.exit).toBeCalledWith(0);
    });

    it('exit after call help', async () => {
      process.argv = ['node', 'bin/cli.js', 'help'];
      await setup();
      expect(process.exit).toBeCalledWith(0);
    });
  });

  describe('readNews', () => {
    xit('should handle error', async () => {
      readNews.mockReturnValue(Promise.reject(new Error('something wrong')));
      // readNews.mockImplementation(() => Promise.reject(Error('GG')));
      process.argv = ['node', 'bin/cli.js'];
      await setup();
      expect(process.exit).toBeCalledWith(1);
    });
  });
});
