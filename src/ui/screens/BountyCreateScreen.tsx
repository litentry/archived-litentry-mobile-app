import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {AppStackParamList} from '@ui/navigation/navigation';
import {Headline, TextInput, Button} from '@ui/library';
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

export function BountyCreateScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);
  const [bountyTitle, SetBountyTitle] = React.useState('');
  const [bountyAllocation, SetBountyAllocation] = React.useState('');
  const [account, setAccount] = React.useState<Account>();
  const modelClose = () => modalRef.current?.close();
  const disabled = !bountyTitle || !bountyAllocation || !account;
  const startTx = useApiTx();
  const {api} = useApi();
  const snackbar = useSnackbar();

  const submitBounty = () => {
    if (account && api) {
      console.log(api?.tx.bounties.proposeBounty);
      startTx({
        address: account.address,
        txMethod: `${api?.tx.bounties.proposeBounty}`,
        params: [bountyAllocation, bountyTitle],
      })
        .then(() => {
          snackbar('New Bounty Created');
        })
        .catch(() => {
          snackbar('Error while submitting Bounty');
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
            placeholder="Bounty title"
            value={bountyTitle}
            onChangeText={(value) => SetBountyTitle(value)}
          />
          <Padder scale={1} />
          <InputLabel
            label={'Bounty Requested Allocation:'}
            helperText={
              'How much should be paid out for completed Bounty. Upon funding, the amount will be reserved in treasury.'
            }
          />
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Bounty requested allocation"
            value={bountyAllocation}
            onChangeText={(value) => {
              SetBountyAllocation(decimalKeypad(value));
            }}
          />
          <Padder scale={1} />
          <InputLabel label={'Bounty Bond:'} helperText={'Proposer bond depends on bounty title length.'} />
          <TextInput placeholder="Bounty Bond" value={'1.1'} disabled />
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
