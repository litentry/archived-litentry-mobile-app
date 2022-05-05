import {formatDate, fromNow} from './date';

test('fromNow function', () => {
  const now = fromNow('12-12-2015');
  expect(now).toBe('6 years ago');
});

test('fromNow function', () => {
  const now = formatDate('04-05-2022');
  expect(now).toBe('05/04/2022');
});
