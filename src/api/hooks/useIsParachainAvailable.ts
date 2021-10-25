import {useEffect, useState} from 'react';
import {useApi} from 'context/ChainApiContext';

export function useIsParachainAvailable() {
  const {api} = useApi();
  const [isParachainAvailable, setIsParachainAvailable] = useState(false);

  useEffect(() => {
    setIsParachainAvailable(Boolean(api?.query.paras));
  }, [api]);

  return isParachainAvailable;
}
