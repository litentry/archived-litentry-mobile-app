import {Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {View} from 'react-native';
import type BN from 'bn.js';

interface Props {
  activeCap: BN;
  activeRaised: BN;
  className?: string;
  fundCount: number;
  totalCap: BN;
  totalRaised: BN;
}

export function CrowdLoanScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <View>
        <Text>CrowdLoan</Text>
      </View>
    </SafeView>
  );
}
