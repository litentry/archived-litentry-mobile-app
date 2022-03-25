import {useEffect, useState} from 'react';
import {useNetwork} from 'context/NetworkContext';

export function useIsParachainAvailable() {
  const {currentNetwork} = useNetwork();
  const [isParachainAvailable, setIsParachainAvailable] = useState(false);

  useEffect(() => {
    setIsParachainAvailable(currentNetwork.key === 'polkadot' || currentNetwork.key === 'kusama');
  }, [currentNetwork]);

  return isParachainAvailable;
}
