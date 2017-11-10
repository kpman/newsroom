const chalk = require('chalk');

const checkForUpdates = require('../checkForUpdates');

let updateNotifier;

jest.mock('update-notifier');

beforeEach(() => {
  updateNotifier = require('update-notifier');
});

it('should be defined', () => {
  expect(checkForUpdates).toBeDefined();
});

describe('#checkForUpdates', () => {
  it('should return when no need to update', () => {
    const mockNotifier = jest.fn();
    updateNotifier.mockReturnValue({
      update: undefined,
      notifier: mockNotifier,
    });
    checkForUpdates();
    expect(mockNotifier).not.toBeCalled();
  });

  it('should call #notify when need to update', () => {
    const mockNotify = jest.fn();
    updateNotifier.mockReturnValue({
      update: {
        latest: '1.0.1',
        current: '1.0.0',
        type: 'patch',
        name: 'pageres',
      },
      notify: mockNotify,
    });
    checkForUpdates();
    expect(mockNotify).toBeCalledWith({
      message: `Update available! ${chalk.red('1.0.0')} → ${chalk.green(
        '1.0.1'
      )} \nRun ${chalk.magenta('npm i -g newsroom-cli')} to update!`,
      defer: false,
    });
  });
});
