import React from 'react';
import {StyleSheet} from 'react-native';
import HyperLink from 'react-native-hyperlink';
import {Subheading, Caption, useTheme} from '@ui/library';

type Props = {
  reason: string;
};

export function TipReason({reason}: Props) {
  const {colors} = useTheme();

  return (
    <>
      <Subheading>{`Reason`}</Subheading>
      <HyperLink linkStyle={{color: colors.primary}} linkDefault>
        <Caption selectable style={styles.tipReasonText}>
          {reason}
        </Caption>
      </HyperLink>
    </>
  );
}

const styles = StyleSheet.create({
  tipReasonText: {
    textAlign: 'justify',
  },
});
