import React from 'react';
import {View} from 'react-native';

type PropTypes = {scale?: number};

export function Padder({scale = 1}: PropTypes) {
  return <View style={{padding: 8 * scale}} />;
}
