import React, {useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {AppStackParamList} from '@ui/navigation/navigation';
import {Headline, TextInput, Button, Text, useTheme} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {standardPadding} from '@ui/styles';
import {Account} from 'src/api/hooks/useAccount';
import {SelectAccount} from '@ui/components/SelectAccount';
import {Padder} from '@ui/components/Padder';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useApi} from 'context/ChainApiContext';
import {useSnackbar} from 'context/SnackbarContext';
import {InputLabel} from '@ui/library/InputLabel';
import {decimalKeypad} from 'src/utils';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useBountiesSummary} from 'src/api/hooks/useBountiesSummary';
import type {BN} from '@polkadot/util';
import {formattedStringToBn} from 'src/api/utils/balance';

export function AddBountyScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const {colors} = useTheme();
  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);

  const {data: bounty} = useBountiesSummary();
  const {formatBalance, stringToBn} = useFormatBalance();

  const [bountyTitle, setBountyTitle] = React.useState('');
  const [bountyAllocation, SetBountyAllocation] = React.useState('');

  const [account, setAccount] = React.useState<Account>();
  const modelClose = () => modalRef.current?.close();
  const startTx = useApiTx();
  const {api} = useApi();
  const snackbar = useSnackbar();

  const {calculatedBountyBond, bountyAllocationBN, isBountyValid, isBountyTitleValid} = useMemo(() => {
    if (bounty && bounty.bountyDepositBase) {
      const calculatedBountyBond = calculateBountyBond(
        bountyTitle,
        formattedStringToBn(bounty.bountyDepositBase),
        formattedStringToBn(bounty.dataDepositPerByte),
      );
      const bountyAllocationBN = stringToBn(bountyAllocation);
      const isBountyValid = bountyAllocationBN
        ? formattedStringToBn(bounty.bountyValueMinimum).gt(bountyAllocationBN)
        : false;
      const isBountyTitleValid = Number(bounty?.maximumReasonLength) <= Number(bountyTitle.length);
      return {calculatedBountyBond: calculatedBountyBond, bountyAllocationBN, isBountyValid, isBountyTitleValid};
    }
    return {
      calculatedBountyBond: formattedStringToBn(bounty?.bountyDepositBase),
      bountyAllocationBN: stringToBn(bountyAllocation),
      isBountyValid: false,
      isBountyTitleValid: bountyTitle.length < 1,
    };
  }, [bountyTitle, bountyAllocation, bounty, stringToBn]);

  const disabled = !bountyAllocation || !account || isBountyValid || isBountyTitleValid;

  const submitBounty = () => {
    if (account && api && bountyAllocationBN) {
      startTx({
        address: account.address,
        txMethod: `${(api.tx.bounties || api.tx.treasury).proposeBounty}`,
        params: [bountyAllocationBN, bountyTitle],
      })
        .then(() => {
          snackbar('New bounty created');
        })
        .catch(() => {
          snackbar('Error while submitting bounty');
        });
      modalRef.current?.close();
    }
  };

  return (
    <Modalize ref={modalRef} adjustToContentHeight onClose={navigation.goBack} panGestureEnabled={false}>
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Headline>{'Add Bounty'}</Headline>
        </View>
        <View style={styles.container}>
          <InputLabel label={'Bounty Title:'} helperText={'Description of the Bounty (to be stored on-chain)'} />
          <TextInput
            autoFocus
            placeholder="Enter bounty title"
            value={bountyTitle}
            onChangeText={(value) => setBountyTitle(value)}
          />
          {isBountyTitleValid && bountyTitle.length !== 0 ? (
            <Text style={{color: colors.error}}>Exceeding maximum reasoning length</Text>
          ) : null}
          <Padder scale={1} />
          <InputLabel
            label={'Bounty Requested Allocation:'}
            helperText={
              'How much should be paid out for completed Bounty. Upon funding, the amount will be reserved in treasury.'
            }
          />
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Enter bounty requested allocation"
            value={bountyAllocation}
            onChangeText={(value) => {
              SetBountyAllocation(decimalKeypad(value));
            }}
            contextMenuHidden={true}
            right={<TextInput.Affix text={formatBalance(stringToBn(bountyAllocation)) ?? ''} />}
          />
          {isBountyValid ? <Text>Minimum bounty reward is: {formatBalance(bounty?.bountyValueMinimum)}</Text> : null}
          <Padder scale={1} />
          <InputLabel label={'Bounty Bond:'} helperText={'Proposer bond depends on bounty title length.'} />
          <TextInput placeholder="Bounty Bond" value={formatBalance(calculatedBountyBond)} disabled />
          <Padder scale={1} />
          <InputLabel
            label={'Submit with account'}
            helperText={'This account will propose the bounty. Bond amount will be reserved on its balance.'}
          />
          <SelectAccount onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)} />
          <Padder scale={1} />
          <View style={styles.row}>
            <Button mode="outlined" onPress={modelClose}>
              Cancel
            </Button>
            <Button mode="outlined" disabled={disabled} onPress={submitBounty}>
              Submit Bounty
            </Button>
          </View>
        </View>
      </Layout>
    </Modalize>
  );
}

function calculateBountyBond(description: string, depositBase: BN, depositPerByte: BN): BN {
  return depositBase.add(depositPerByte.muln(countUtf8Bytes(description)));
}
function countUtf8Bytes(str: string): number {
  return new Blob([str]).size;
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 2,
  },
  header: {
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
