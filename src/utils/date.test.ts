import {formatDate, fromNow, getCurrentYear} from './date';

test('fromNow function', () => {
  const now = fromNow('12-12-2015');
  expect(now).toBe('6 years ago');
});

test('getCurrentYear function', () => {
  const fullYear = new Date().getFullYear();
  const currentYear = getCurrentYear();
  expect(currentYear).toEqual(fullYear);
});

test('formatDate function', () => {
  const format_date = formatDate('04-05-2022');
  expect(format_date).toBe('05/04/2022');
});
