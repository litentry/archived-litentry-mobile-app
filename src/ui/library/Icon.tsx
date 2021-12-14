import React from 'react';
import MaterialCommunityIcons, {default as VectorIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';

type IconProps = {
  name: typeof MaterialCommunityIcons['name'];
  size?: number;
};

export function Icon({name, size = 30}: IconProps) {
  const {colors} = useTheme();

  return <VectorIcon name={name} size={size} color={colors.onSurface} />;
}
