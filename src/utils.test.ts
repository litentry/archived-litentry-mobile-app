import {decimalKeypad, notEmpty} from './utils';

test('utility function notEmpty', () => {
  const emptyString = notEmpty('');
  expect(emptyString).toBeFalsy();

  const nullValue = notEmpty(null);
  expect(nullValue).toBeFalsy();

  const undefinedValue = notEmpty(undefined);
  expect(undefinedValue).toBeFalsy();

  const testString = notEmpty('test');
  expect(testString).toBeTruthy();
});

test('utility function decimalKeypad', () => {
  const inputValue = decimalKeypad('10');
  expect(inputValue).toBe('10');

  const decimalValue = decimalKeypad('.');
  expect(decimalValue).toBe('0.');

  const commaValue = decimalKeypad(',');
  expect(commaValue).toBe('0.');

  const commaNumberValue = decimalKeypad('123,2');
  expect(commaNumberValue).toBe('123.2');

  const decimalNumberValue = decimalKeypad('12.2');
  expect(decimalNumberValue).toBe('12.2');
});
