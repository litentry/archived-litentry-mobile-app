// WebApp.js

import React, {useState} from 'react';
import {webViewRender, emit, useSubscribe} from 'react-native-react-bridge/lib/web';
import {DAppClient} from '@airgap/beacon-sdk';
import {useEffect} from 'react';

const dAppClient = new DAppClient({name: 'Beacon Docs'});

const Root = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      // try {
      //   console.log('Requesting permissions...');
      //   const permissions = await dAppClient.requestPermissions();
      //   console.log('Got permissions:', permissions.address);
      // } catch (error) {
      //   console.log('Got error:', error);
      // }
    })();
  }, []);

  // useSubscribe hook receives message from React Native
  useSubscribe((message: any) => {
    if (message.type === 'success') {
      setData(message.data);
    }
  });
  return (
    <div>
      <div>AMIR</div>
      <div>{data}</div>
      <button
        onClick={() => {
          // emit sends message to React Native
          //   type: event name
          //   data: some data which will be serialized by JSON.stringify
          emit({type: 'hello', data: 123});
        }}>
        AMIR
      </button>
    </div>
  );
};

// This statement is detected by babelTransformer as an entry point
// All dependencies are resolved, compressed and stringified into one file
export default webViewRender(<Root />);
