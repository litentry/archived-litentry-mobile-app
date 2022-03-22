import React from 'react';
import {Text} from '@ui/library';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {View} from 'react-native';
import {memberDetailsScreen} from '@ui/navigation/routeKeys';

export function MemberDetailsScreen({}: {route: RouteProp<AppStackParamList, typeof memberDetailsScreen>}) {
  return (
    <View>
      <Text>MemberDetailsScreen</Text>
    </View>
  );
}
