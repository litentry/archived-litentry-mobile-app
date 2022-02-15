import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

type Props = {
  children: React.ReactNode;
};

function HideKeyBoard({children}: Props) {
  const touchablePresssed = () => {
    console.log('Pressed');
  };
  return (
    <TouchableWithoutFeedback onPress={() => touchablePresssed()}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
}

export default HideKeyBoard;
