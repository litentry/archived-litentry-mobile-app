import React from 'react';
import {Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardStackParamList} from 'src/navigation/navigation';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {useBounty} from 'src/api/hooks/useBounty';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Bounty'>;
};

export function BountyDetailScreen({route}: ScreenProps) {
  const index = route.params.index;
  const bountyData = useBounty(index);

  if (!bountyData) {
    return null;
  }

  return (
    <SafeView edges={noTopEdges}>
      <Text>Bounty screen {bountyData.description}</Text>
    </SafeView>
  );
}
