import React from 'react';
import SafeView from 'presentational/SafeView';
import WebView from 'react-native-webview';

export function BeaconWebViewScreen() {
  return (
    <SafeView>
      <WebView style={{flex: 1}} source={require('../beacon/index_inline.html')} />
    </SafeView>
  );
}
