import {Registry} from 'src/api/hooks/useChainInfo';
import {stringToBn} from './balance';

test('stringToBn test case', () => {
  // const {data} = useChainInfo();
  const register = stringToBn({} as Registry, '');
  expect(true).toBeTruthy();
});
