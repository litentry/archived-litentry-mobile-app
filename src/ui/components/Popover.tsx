import React from 'react';
import {Icon, useTheme, Caption} from '@ui/library';
import {Popable} from 'react-native-popable';
import {View, ViewStyle} from 'react-native';

export type PopableProps = {
  content: string;
  contentStyle?: ViewStyle;
  backgroundColor?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  iconStyle?: ViewStyle;
};

export function Popover(props: PopableProps) {
  const {colors} = useTheme();

  return (
    <Popable
      content={
        <View style={props.contentStyle}>
          <Caption>{props.content}</Caption>
        </View>
      }
      backgroundColor={colors.accent}>
      <View style={props.iconStyle}>
        {props.icon ? <Icon name={props.icon} size={props.iconSize || 20} color={props.iconColor} /> : null}
      </View>
    </Popable>
  );
}
