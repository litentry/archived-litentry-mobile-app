import {decimalKeypad, notEmpty} from './utils';

test('utility function notEmpty', () => {
  const testCase = ['', null, undefined, 'Test'];
  const expected = [false, false, false, true];
  testCase.forEach((element, i) => {
    const decimalValue = notEmpty(element);
    expect(decimalValue).toBe(expected[i]);
  });
});

test('utility function decimalKeypad', () => {
  const testCase = ['10', '.', '123,2', '12.2'];
  const expected = ['10', '0.', '123.2', '12.2'];
  testCase.forEach((element, i) => {
    const decimalValue = decimalKeypad(element);
    expect(decimalValue).toBe(expected[i]);
  });
});
