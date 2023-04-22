import chalk from 'chalk';
import figures from 'figures';

import { log, print, warn, error } from '../log';

const consoleLog = console.log;

beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  console.log = consoleLog;
});

it('should be defined', () => {
  expect(log).toBeDefined();
  expect(print).toBeDefined();
  expect(warn).toBeDefined();
  expect(error).toBeDefined();
});

describe('#log', () => {
  it('should call console.log with default color blue & icon pointer', () => {
    log('hi');
    expect(console.log).toBeCalledWith(`${chalk.blue(figures.pointer)} hi`);
  });

  it('should call console.log with custom color', () => {
    log('hi', { color: 'red' });
    expect(console.log).toBeCalledWith(`${chalk.red(figures.pointer)} hi`);
  });

  it('should call console.log with custom icon', () => {
    log('hi', { icon: 'cross' });
    expect(console.log).toBeCalledWith(`${chalk.blue(figures.cross)} hi`);
  });

  it('should call console.log with custom color & icon', () => {
    log('hi', { color: 'red', icon: 'warning' });
    expect(console.log).toBeCalledWith(`${chalk.red(figures.warning)} hi`);
  });
});

describe('#print', () => {
  it('should call console.log with green color and default icon as `pointer`', () => {
    print('I am Van Gogh');
    expect(console.log).toBeCalledWith(
      `${chalk.green(figures.pointer)} I am Van Gogh`
    );
  });
});

describe('#warn', () => {
  it('should call console.log with yellow color and icon as `warning`', () => {
    warn('I want to play a game');
    expect(console.log).toBeCalledWith(
      `${chalk.yellow(figures.warning)} I want to play a game`
    );
  });
});

describe('#error', () => {
  it('should call console.log with red color and icon as `cross`', () => {
    error('trick or treat');
    expect(console.log).toBeCalledWith(
      `${chalk.red(figures.cross)} trick or treat`
    );
  });
});
