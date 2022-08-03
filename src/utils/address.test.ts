import {toShortAddress} from './address';

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
