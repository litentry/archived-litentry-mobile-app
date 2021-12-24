import React from 'react';
import {StyleSheet} from 'react-native';
import {Hash} from '@polkadot/types/interfaces';
import {useTipReason} from 'src/api/hooks/useTipReason';
import {LoadingItem} from '@ui/components/LoadingBox';
import {Subheading, Caption, useTheme} from '@ui/library';
import HyperLink from 'react-native-hyperlink';

type Props = {
  reasonHash: Hash;
};

export function TipReason({reasonHash}: Props) {
  const {colors} = useTheme();
  const {data, isLoading} = useTipReason(reasonHash);

  if (isLoading) {
    return <LoadingItem width={80} />;
  }

  return (
    <>
      <Subheading>{`Reason`}</Subheading>
      <HyperLink linkStyle={{color: colors.primary}} linkDefault>
        <Caption selectable style={styles.tipReasonText}>
          {data}
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
