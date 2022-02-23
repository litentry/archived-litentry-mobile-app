/** @deprecated use @ui/components/Account/Account instead */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {monofontFamily} from '@ui/styles';
import JudgmentStatus from './JudgmentStatus';
import {stringShorten} from '@polkadot/util';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {SubstrateChainAccount} from 'src/generated/litentryGraphQLTypes';

type PropTypes = {
  proposer?: SubstrateChainAccount; // SubstrateChainAccount | IdentityInfo
  identity?: IdentityInfo;
  accountName?: string;
};

function AccountInfoInlineTeaser({proposer}: PropTypes) {
  const judgements = proposer?.registration.judgements;
  if (!proposer) return <></>;
  return (
    <View style={styles.container}>
      <Caption style={styles.text}>
        {proposer?.display ? proposer.display : stringShorten(proposer.address.toString(), 12)}
      </Caption>
      {judgements?.length ? <Padder scale={0.2} /> : null}
      {judgements?.map((judgement: any, i: React.Key | null | undefined) => (
        <JudgmentStatus key={i} judgement={judgement} registration={proposer.registration} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: monofontFamily,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
});

export default AccountInfoInlineTeaser;
