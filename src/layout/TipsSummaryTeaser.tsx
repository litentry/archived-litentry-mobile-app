import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {hexToString} from '@polkadot/util';
import {Card, Layout, Text} from '@ui-kitten/components';
import {useTreasuryTips} from 'src/hook/useTreasuryTips';
import StatInfoBlock from 'presentational/StatInfoBlock';
import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import AddressInlineTeaser from './AddressInlineTeaser';
import {useCall} from 'src/hook/useCall';
import {Option, Bytes} from '@polkadot/types';
import {ChainApiContext} from 'context/ChainApiContext';
import {Hash} from '@polkadot/types/interfaces';

const transformTip = {
  transform: (optBytes: Option<Bytes>) =>
    optBytes.isSome ? hexToString(optBytes.unwrap().toHex()) : null,
};

function TipsSummaryTeaser() {
  const tips = useTreasuryTips();

  if (!tips[0]) {
    return null;
  }

  const tip = tips[0][1];

  // TODO create a badge component ??
  return (
    <SeactionTeaserContainer
      title={`Tips (${tips.length})`}
      onMorePress={() => alert('navigate to tips list')}>
      <>
        <Layout>
          <Card onPress={() => alert('navigate to tip detail')}>
            <Text category="c2" style={{textAlign: 'center'}}>
              Latest Tip
            </Text>
            <View>
              <StatInfoBlock title="Who">
                <AddressInlineTeaser address={String(tip.who)} />
              </StatInfoBlock>
              <StatInfoBlock title="Finder">
                <AddressInlineTeaser address={String(tip.finder)} />
              </StatInfoBlock>
            </View>
            <TipReason reasonHash={tip.reason} />
          </Card>
        </Layout>
      </>
    </SeactionTeaserContainer>
  );
}

function useTipReason(hash: Hash) {
  const {api} = useContext(ChainApiContext);

  const reasonText = useCall<string | null>(
    api?.query.tips.reasons,
    [hash],
    transformTip,
  );

  return reasonText || hash.toHex();
}

function TipReason({reasonHash}: {reasonHash: Hash}) {
  const reasonText = useTipReason(reasonHash);

  return <StatInfoBlock title="Reason">{reasonText}</StatInfoBlock>;
}

// const styles = StyleSheet.create({
// container: {
// flexDirection: 'row',
// justifyContent: 'space-between',
// },
// });

export default TipsSummaryTeaser;
