const getSourceQuestion = require('../getSourceQuestion');

it('be defined', () => {
  expect(getSourceQuestion).toBeDefined();
});

describe('#getSourceQuestion', () => {
  it('should return a autocomplete type question', () => {
    const sources = [];
    const q = getSourceQuestion(sources);
    expect(q.type).toBe('autocomplete');
  });
});
