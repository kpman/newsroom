const questions = require('../');

it('should be defined', () => {
  expect(questions).toBeDefined();
});

it('should export questions', () => {
  expect(questions).toEqual(
    expect.objectContaining({
      getSourceQuestion: expect.any(Function),
      getTitleQuestion: expect.any(Function),
    })
  );
});
