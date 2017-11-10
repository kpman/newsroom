const getTitleQuestion = require('../getTitleQuestion');

it('should be defined', () => {
  expect(getTitleQuestion).toBeDefined();
});

describe('#getTitleQuestion', () => {
  it('should return a list type question', () => {
    const titles = [];
    const q = getTitleQuestion(titles);
    expect(q.type).toBe('list');
  });

  it('should return a question object with name `title`', () => {
    const titles = [];
    const q = getTitleQuestion(titles);
    expect(q.name).toBe('title');
  });

  it('should return a object with choices passin', () => {
    const titles = ['cool', 'awesome'];
    const q = getTitleQuestion(titles);
    expect(q.choices).toEqual(['cool', 'awesome']);
  });

  it('filter function will return parameter', () => {
    const titles = ['cool', 'awesome'];
    const q = getTitleQuestion(titles);
    expect(q.filter('yayaya')).toEqual('yayaya');
  });
});
