import {useCallback, useEffect, useState} from 'react';
import {useCryptoUtil} from '@polkadotApi/useCryptoUtil';
import {NetworkType} from 'src/atoms/network';

export function useIsAddressValid(network: NetworkType, address?: string) {
  const [isValid, setIsAddressValid] = useState(false);
  const {checkAddress} = useCryptoUtil();

  useEffect(() => {
    if (address) {
      checkAddress({address, prefix: network.ss58Format}).then((result) => setIsAddressValid(result.isValid));
    }
  }, [address, checkAddress, network.key, network.ss58Format]);

  const isAddressValid = useCallback(
    async (addr: string) => {
      const result = await checkAddress({address: addr, prefix: network.ss58Format});
      return result.isValid;
    },
    [checkAddress, network.ss58Format],
  );

  return {isAddressValid, isValid};
}
