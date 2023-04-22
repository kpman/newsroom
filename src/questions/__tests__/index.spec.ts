import { getSourceQuestion, getTitleQuestion } from '..';

it('should export questions', () => {
  expect(getSourceQuestion).toBeDefined();
  expect(getTitleQuestion).toBeDefined();
});
