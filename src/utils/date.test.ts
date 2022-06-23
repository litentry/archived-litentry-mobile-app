import dayjs from 'dayjs';
import {formatDate, fromNow, getCurrentYear} from './date';

test('fromNow function', () => {
  const testDate = dayjs().subtract(5, 'year');
  const fromNowDate = fromNow(testDate.format());
  expect(fromNowDate).toBe('5 years ago');
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
