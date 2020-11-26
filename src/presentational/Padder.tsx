import React from 'react';
import {View} from 'react-native';
import {standardPadding} from 'src/styles';

type PropTypes = {scale: number};

function Padder({scale}: PropTypes) {
  return <View style={{padding: standardPadding * scale}} />;
}

export default Padder;
