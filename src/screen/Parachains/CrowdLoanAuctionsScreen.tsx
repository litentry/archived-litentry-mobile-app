import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {Headline} from 'src/packages/base_components';

export function ParachainsAuctionsScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <Headline>TEST</Headline>
    </SafeView>
  );
}
