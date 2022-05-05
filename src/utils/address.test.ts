import {getAvailableNetworks} from 'context/NetworkContext';
import {waitFor} from 'src/testUtils';
import {NetworkType} from 'src/types';
import {isAddressValid, toShortAddress} from './address';

test('parseAddress function test', () => {
  // const address = parseAddress();
});

test('toShortAddress function test', () => {
  const testCase = [
    '12BxCyEpjmi3fz582Vs99y5o4khR9oRMQXhM9LUcAj4mKaYo',
    '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw',
  ];
  const expected = ['12BxCy…4mKaYo', '1HDgY7…pKUKFw'];
  testCase.forEach((address, i) => {
    const decimalValue = toShortAddress(address);
    expect(decimalValue).toBe(expected[i]);
  });
});

test('isAddressValid function test', async () => {
  const networkTypes = await waitFor(() => getAvailableNetworks());
  const validAddress_polka = isAddressValid(
    networkTypes[0] as NetworkType,
    '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw',
  );
  expect(validAddress_polka).toBeTruthy();
  const validAddress_kusama = isAddressValid(
    networkTypes[1] as NetworkType,
    'D3KNzSrENcvScLGYKdzMNu7LBcCsoVyZ8X8DDjSh6Sg6LXN',
  );
  expect(validAddress_kusama).toBeTruthy();
  const validAddress_litmus = isAddressValid(
    networkTypes[3] as NetworkType,
    'jcSKTfG892DzZbXJjm13MRNptERKHEDXpsE8ooUFPt9pz8KvJ',
  );
  expect(validAddress_litmus).toBeTruthy();
});
