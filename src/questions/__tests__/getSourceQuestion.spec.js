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

  describe('#validate', () => {
    it('should return a boolean when passing something', () => {
      const sources = [];
      const validate = getSourceQuestion(sources).validate;
      expect(validate('input...')).toBeTruthy();
    });

    it('should return `Type something!` when passing undefined', () => {
      const sources = [];
      const validate = getSourceQuestion(sources).validate;
      expect(validate()).toEqual('Type something!');
    });
  });
});
