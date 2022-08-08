import React from 'react';
import {StyleSheet} from 'react-native';
import HyperLink from 'react-native-hyperlink';
import {Text, useTheme} from '@ui/library';

type Props = {
  reason: string;
};

export function TipReason({reason}: Props) {
  const {colors} = useTheme();

  return (
    <>
      <Text variant="titleMedium">{`Reason`}</Text>
      <HyperLink linkStyle={{color: colors.primary}} linkDefault>
        <Text variant="bodySmall" selectable style={styles.tipReasonText}>
          {reason}
        </Text>
      </HyperLink>
    </>
  );
}

const styles = StyleSheet.create({
  tipReasonText: {
    textAlign: 'justify',
  },
});
