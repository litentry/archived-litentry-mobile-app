import {countUtf8Bytes, decimalKeypad, notEmpty} from './utils';

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

test('Utility function countUtf8Bytes', () => {
  const emptyDescription = countUtf8Bytes('');
  expect(emptyDescription).toBe(1);

  const smallDescription = countUtf8Bytes('Litentry');
  expect(smallDescription).toBe(1);

  const largeDescription = countUtf8Bytes(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim quam et mi dictum facilisis. Quisque maximus, risus rhoncus ultrices tincidunt, diam lectus convallis ligula, in pellentesque justo elit id ipsum. Phasellus tempus lobortis quam, nec euismod nisi. Pellentesque felis lorem, maximus eget elit consequat, dignissim dignissim tellus. Phasellus quis neque ut ex auctor pellentesque. Sed convallis ultrices est vel sollicitudin. Integer molestie rutrum purus sit amet eleifend.`,
  );
  expect(largeDescription).toBe(1);
});
