import {Registry} from 'src/api/hooks/useChainInfo';
import {formattedStringToBn, stringToBn} from './balance';

test('stringToBn test case', async () => {
  const expected_result = {
    negative: 0,
    words: [3815424, 12049553, 7827495, 6],
    length: 4,
    red: null,
  };
  const polka_registry = {__typename: 'SubstrateChainRegistry', decimals: 10, token: 'DOT'} as Registry;
  const polka_stringToBn = stringToBn(polka_registry, '184864063379582');
  expect(polka_stringToBn).toEqual(expected_result);

  const kusama_registry = {__typename: 'SubstrateChainRegistry', decimals: 10, token: 'KSM'} as Registry;
  const kusama_stringToBn = stringToBn(kusama_registry, '184864063379582');
  expect(kusama_stringToBn).toEqual(expected_result);
});

test('formattedStringToBn test case', () => {
  const expected_result_polka = {negative: 0, words: [11569], length: 1, red: null};
  const expected_result_kusama = {negative: 0, words: [12302], length: 1, red: null};

  const polka_bn = formattedStringToBn('10 DOT');
  expect(polka_bn).toEqual(expected_result_polka);
  expect(polka_bn).not.toEqual(expected_result_kusama);

  const kusama_bn = formattedStringToBn('10 KSM');
  expect(kusama_bn).toEqual(expected_result_kusama);
  expect(kusama_bn).not.toEqual(expected_result_polka);
});
