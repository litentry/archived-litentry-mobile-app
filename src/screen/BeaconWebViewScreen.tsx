import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import WebView from 'react-native-webview';

export function BeaconWebViewScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <WebView style={{flex: 1}} source={require('../beacon/index_inline.html')} />
    </SafeView>
  );
}
