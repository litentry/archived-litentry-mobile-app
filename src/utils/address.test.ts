import {getAvailableNetworks} from 'context/NetworkContext';
import {NetworkType} from 'src/types';
import {isAddressValid, toShortAddress} from './address';

const POLKADOT_ADDRESS = '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw';
const KUSAMA_ADDRESS = 'D3KNzSrENcvScLGYKdzMNu7LBcCsoVyZ8X8DDjSh6Sg6LXN';
const LITMUS_ADDRESS = 'jcSKTfG892DzZbXJjm13MRNptERKHEDXpsE8ooUFPt9pz8KvJ';

test('toShortAddress function test', () => {
  const testCase = [POLKADOT_ADDRESS, KUSAMA_ADDRESS, LITMUS_ADDRESS];
  const expected = ['1HDgY7…pKUKFw', 'D3KNzS…Sg6LXN', 'jcSKTf…pz8KvJ'];
  testCase.forEach((address, i) => {
    const decimalValue = toShortAddress(address);
    expect(decimalValue).toBe(expected[i]);
  });
});

test('isAddressValid function test', () => {
  const networkTypes = getAvailableNetworks();
  const validAddress_polka = isAddressValid(networkTypes[0] as NetworkType, POLKADOT_ADDRESS);
  expect(validAddress_polka).toBeTruthy();

  const invalidAddress_polka = isAddressValid(networkTypes[0] as NetworkType, KUSAMA_ADDRESS);
  expect(invalidAddress_polka).toBeFalsy();

  const validAddress_kusama = isAddressValid(networkTypes[1] as NetworkType, KUSAMA_ADDRESS);
  expect(validAddress_kusama).toBeTruthy();

  const invalidAddress_kusama = isAddressValid(networkTypes[1] as NetworkType, LITMUS_ADDRESS);
  expect(invalidAddress_kusama).toBeFalsy();

  const validAddress_litmus = isAddressValid(networkTypes[3] as NetworkType, LITMUS_ADDRESS);
  expect(validAddress_litmus).toBeTruthy();

  const invalidAddress_litmus = isAddressValid(networkTypes[3] as NetworkType, POLKADOT_ADDRESS);
  expect(invalidAddress_litmus).toBeFalsy();
});
