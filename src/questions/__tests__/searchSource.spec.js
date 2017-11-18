const searchSource = require('../searchSources');

it('should be defined', () => {
  expect(searchSource).toBeDefined();
});

describe('#searchSource', () => {
  it('should be a curry function', () => {
    const sources = [];
    const func = searchSource(sources);
    expect(func).toBeInstanceOf(Function);
  });

  it('should return empty array', async () => {
    const sources = [];
    const func = searchSource(sources);
    const result = await func();
    expect(result).toEqual([]);
  });

  it('should return empty array', async () => {
    const sources = ['hackernews'];
    const func = searchSource(sources);
    const result = await func(undefined, 'reddit');
    expect(result).toEqual([]);
  });

  it('should return match array', async () => {
    const sources = ['hackernews', 'techcrunch'];
    const func = searchSource(sources);
    const result = await func(undefined, 'tech');
    expect(result).toEqual(['techcrunch']);
  });
});
