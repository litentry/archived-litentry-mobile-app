import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import WebView from 'react-native-webview';
import {Linking} from 'react-native';

export function BeaconWebViewScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <WebView
        style={{flex: 1}}
        source={require('src/beacon/index_inline.html')}
        onShouldStartLoadWithRequest={(request) => {
          if (!request.url.includes('index_inline')) {
            Linking.openURL(request.url);
            return false;
          }

          return true;
        }}
      />
    </SafeView>
  );
}
