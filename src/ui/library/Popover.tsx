import React from 'react';
import {useTheme} from '@ui/library';
import {Popable} from 'react-native-popable';

export type PopoverProps = {
  popableText: string;
  popableContent?: React.ReactNode;
};

export function Popover({popableContent, popableText}: PopoverProps) {
  const {colors} = useTheme();
  return (
    <Popable content={popableText} backgroundColor={colors.accent}>
      {popableContent}
    </Popable>
  );
}
