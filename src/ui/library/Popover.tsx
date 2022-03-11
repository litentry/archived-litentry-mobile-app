import React from 'react';
import {Popable} from 'react-native-popable';
import {PopableProps} from 'react-native-popable/lib/typescript/Popable';

export type PopoverProps = {
  popableProps: PopableProps;
  popableContent?: React.ReactNode;
};

export function Popover({popableContent, popableProps}: PopoverProps) {
  return <Popable {...popableProps}>{popableContent}</Popable>;
}
