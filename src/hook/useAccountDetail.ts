import {useState, useEffect} from 'react';
import {Registration} from '@polkadot/types/interfaces';
import {ApiPromise} from '@polkadot/api';
import {u8aToString} from '@polkadot/util';
import {SupportedNetworkType, AddressDetailType} from 'src/types';
import {createLogger} from 'src/utils';
const logger = createLogger('useAccountDetail');

function useAccountDetail(
  network?: SupportedNetworkType | null,
  address?: string,
  api?: ApiPromise,
) {
  const [display, setDisplay] = useState(address || '');
  const [identityAddress, setIdentityAddress] = useState(address || '');
  const [detail, setDetail] = useState<AddressDetailType>();
  const [subAccountDisplay, setSubAccountDisplay] = useState('');

  useEffect(() => {
    let localUnsub: () => void | null;

    if (
      api &&
      identityAddress &&
      (network === 'polkadot' || network === 'kusama')
    ) {
      api?.query.identity
        ?.identityOf(identityAddress, (registration) => {
          const accountDetail = registration.unwrapOr(undefined);

          if (accountDetail) {
            const {info} = accountDetail;
            const displayName =
              u8aToString(info.display.asRaw) || identityAddress;
            setDisplay(displayName);
            setDetail({network, data: registration.unwrapOr(undefined)});
          } else {
            api.query.identity
              .superOf(identityAddress)
              .then((superRegistration) => {
                const superAccount = superRegistration.unwrapOr(undefined);

                if (superAccount) {
                  const [superAccountAddress, displayData] = superAccount;
                  setIdentityAddress(superAccountAddress.toString());
                  setSubAccountDisplay(u8aToString(displayData.asRaw));
                }
              });
          }
        })
        .then((unsub) => {
          logger.log('debug', `useAccountDetail unsub ${unsub}`);
          localUnsub = unsub;
        });
    }
    return () => {
      console.log('unsub is called');
      localUnsub && localUnsub();
    };
  }, [api, identityAddress, network]);

  const displayFull = subAccountDisplay
    ? `${display}/${subAccountDisplay}`
    : display;

  return {
    display: displayFull,
    isNaked: displayFull === identityAddress,
    detail,
  };
}

export default useAccountDetail;
