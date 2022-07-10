import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Layout} from '@ui/components/Layout';
import LoadingView from '@ui/components/LoadingView';
import {Icon} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {HexString, SignCredentials, TxPayload} from 'polkadot-api';
import {useTx} from '@polkadotApi/useTx';
import {useKeyring} from '@polkadotApi/useKeyring';

type InternalSigningProp = {
  credentials: SignCredentials;
  signature: never;
};

type ExternalSigningProp = {
  signature: HexString;
  credentials: never;
};

type Props = {
  txPayload: TxPayload;
  onSuccess: () => void;
  onError: () => void;
} & InternalSigningProp &
  ExternalSigningProp;

export function SubmittingView() {
  // const {sendTx} = useTx();
  // const {sign} = useKeyring();

  // useEffect(() => {
  //   (async () => {
  //     if (props.signature) {
  //       // sendTx({});
  //     } else {
  //       // sign and send
  //     }
  //   })();
  // }, [props.signature]);

  <Layout style={styles.container}>
    <Text>Submitting...</Text>
  </Layout>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
