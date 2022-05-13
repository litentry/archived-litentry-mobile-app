import {Registry} from 'src/api/hooks/useChainInfo';
import {formattedStringToBn, stringToBn} from './balance';

test('stringToBn test case', () => {
  const expectedResult = {
    negative: 0,
    words: [3815424, 12049553, 7827495, 6],
    length: 4,
    red: null,
  };
  const polkaRegistry = {__typename: 'SubstrateChainRegistry', decimals: 10, token: 'DOT'} as Registry;
  const polkaStringToBn = stringToBn(polkaRegistry, '184864063379582');
  expect(polkaStringToBn).toEqual(expectedResult);

  const kusamaRegistry = {__typename: 'SubstrateChainRegistry', decimals: 10, token: 'KSM'} as Registry;
  const kusamaStringToBn = stringToBn(kusamaRegistry, '184864063379582');
  expect(kusamaStringToBn).toEqual(expectedResult);
});

test('formattedStringToBn test case', () => {
  const bigNumberStr = formattedStringToBn('183726937232040');
  expect(bigNumberStr).toEqual({negative: 0, words: [47469224, 2737744], length: 2, red: null});

  const bigNumberEmptyStr = formattedStringToBn('');
  expect(bigNumberEmptyStr).toEqual({negative: 0, words: [0], length: 1, red: null});
});
