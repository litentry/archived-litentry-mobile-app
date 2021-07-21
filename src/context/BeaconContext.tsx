import {PropsWithChildren} from 'react';
import {useEffect} from 'react';
import {BeaconEvent, DAppClient} from '@airgap/beacon-sdk';
import * as AsyncStorage from 'src/service/AsyncStorage';
// import path from 'path';
// import crypto from 'crypto';

const dAppClient = new DAppClient({
  name: 'Beacon Docs',
  storage: AsyncStorage.AsyncStorageForBeaconSdk as any,
  disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
  eventHandlers: {
    // To keep the pairing alert, we have to add the following default event handlers back
    [BeaconEvent.PERMISSION_REQUEST_SENT]: {
      handler: console.log,
    },
    [BeaconEvent.PERMISSION_REQUEST_ERROR]: {
      handler: console.log,
    },
    [BeaconEvent.PERMISSION_REQUEST_SUCCESS]: {
      handler: console.log,
    },
  },
});
interface Props {
  children: JSX.Element;
}

export function BeaconContextProvider(props: Props) {
  useEffect(() => {
    (async () => {
      // const permissions = await dAppClient.requestPermissions();
      // console.log('PPP', permissions);
    })();
  });

  return props.children;
}
