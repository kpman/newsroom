const checkSource = require('../checkSource');

it('should be defined', () => {
  expect(checkSource).toBeDefined();
});

describe('#checkSource', () => {
  it('should check the source in the sources', () => {
    const source = 'fb';
    const sources = [
      {
        title: 'fb',
      },
    ];
    expect(() => checkSource(source, sources)).not.toThrow();
  });

  it('should throw error', () => {
    const source = 'fb';
    const sources = [
      {
        title: 'snap',
      },
    ];
    expect(() => checkSource(source, sources)).toThrowErrorMatchingSnapshot();
  });
});
