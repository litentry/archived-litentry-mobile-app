// App.js

import React from 'react';
import WebView from 'react-native-webview';
import {useBridge} from 'react-native-react-bridge';
import webApp from 'src/webview/beacon_sdk/BeaconSdkWebView';
import SafeView from 'presentational/SafeView';

export const BeaconScreen = () => {
  // useBridge hook create props for WebView and handle communication
  // The argument is callback to receive message from React
  const {ref, onMessage, emit} = useBridge((message) => {
    // emit sends message to React
    //   type: event name
    //   data: some data which will be serialized by JSON.stringify
    if (message.type === 'hello' && message.data === 123) {
      emit({type: 'success', data: 'succeeded!'});
    }
  });

  return (
    <SafeView>
      <WebView
        // ref, source and onMessage must be passed to react-native-webview
        ref={ref}
        // Pass the source code of React app
        source={{html: webApp}}
        onMessage={onMessage}
      />
    </SafeView>
  );
};
