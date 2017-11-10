const getSourceQuestion = require('../getSourceQuestion');

it('be defined', () => {
  expect(getSourceQuestion).toBeDefined();
});

describe('#getSourceQuestion', () => {
  it('should return a list type question', () => {
    const sources = [];
    const q = getSourceQuestion(sources);
    expect(q.type).toBe('list');
  });

  it('should return a object with choices passin', () => {
    const sources = ['cool', 'awesome'];
    const q = getSourceQuestion(sources);
    expect(q.choices).toEqual(['cool', 'awesome']);
  });

  it('filter function will return parameter', () => {
    const sources = ['cool', 'awesome'];
    const q = getSourceQuestion(sources);
    expect(q.filter('yayaya')).toEqual('yayaya');
  });
});
