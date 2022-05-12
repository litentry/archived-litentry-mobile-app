import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, HelperText, Subheading} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import globalStyles, {standardPadding} from '@ui/styles';
import {Account} from 'src/api/hooks/useAccount';
import {SelectAccount} from '@ui/components/SelectAccount';
import {Padder} from '@ui/components/Padder';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useApi} from 'context/ChainApiContext';
import {useSnackbar} from 'context/SnackbarContext';
import {InputLabel} from '@ui/library/InputLabel';
import {decimalKeypad} from 'src/utils';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {useBountiesSummary} from 'src/api/hooks/useBountiesSummary';
import type {BN} from '@polkadot/util';
import {formattedStringToBn} from 'src/utils/balance';

type Props = {
  onClose: () => void;
};

export function AddBounty({onClose}: Props) {
  const {data: bounty} = useBountiesSummary();
  const {formatBalance, stringToBn} = useFormatBalance();

  const [bountyTitle, setBountyTitle] = React.useState('');
  const [bountyAllocation, SetBountyAllocation] = React.useState('');

  const [account, setAccount] = React.useState<Account>();
  const startTx = useApiTx();
  const {api} = useApi();
  const snackbar = useSnackbar();

  const {calculatedBountyBond, bountyAllocationBN, isBountyValid, isBountyTitleValid} = useMemo(() => {
    if (bounty && bounty.bountyDepositBase) {
      const bountyBondCalculated = calculateBountyBond(
        bountyTitle,
        formattedStringToBn(bounty.bountyDepositBase),
        formattedStringToBn(bounty.dataDepositPerByte),
      );
      const allocationBNBounty = stringToBn(bountyAllocation);
      const isValidBounty = allocationBNBounty
        ? allocationBNBounty.gt(formattedStringToBn(bounty.bountyValueMinimum))
        : false;
      const isTitleValid =
        Number(bountyTitle.length) <= Number(bounty.maximumReasonLength) && Number(bountyTitle.length) > 0;
      return {
        calculatedBountyBond: bountyBondCalculated,
        bountyAllocationBN: allocationBNBounty,
        isBountyValid: isValidBounty,
        isBountyTitleValid: isTitleValid,
      };
    }
    return {
      calculatedBountyBond: formattedStringToBn(bounty?.bountyDepositBase),
      bountyAllocationBN: stringToBn(bountyAllocation),
      isBountyValid: false,
      isBountyTitleValid: bountyTitle.length < 1,
    };
  }, [bountyTitle, bountyAllocation, bounty, stringToBn]);

  const disabled = !bountyAllocation || !account || !isBountyValid || !isBountyTitleValid;

  const submitBounty = () => {
    if (account && api && bountyAllocationBN) {
      startTx({
        address: account.address,
        txMethod: `${api.tx.bounties ? `bounties.proposeBounty` : `treasury.proposeBounty`}`,
        params: [bountyAllocationBN, bountyTitle],
      })
        .then(() => {
          snackbar('New bounty created');
        })
        .catch(() => {
          snackbar('Error while submitting bounty');
        });
      onClose();
    }
  };

  return (
    <Layout style={styles.container}>
      <Subheading style={globalStyles.textCenter}>{`Add Bounty`}</Subheading>
      <Padder scale={1} />
      <InputLabel label={'Bounty Title:'} helperText={'Description of the Bounty (to be stored on-chain)'} />
      <TextInput
        dense
        multiline
        numberOfLines={4}
        autoComplete="off"
        mode="outlined"
        placeholder="Enter bounty title"
        value={bountyTitle}
        onChangeText={(value) => setBountyTitle(value)}
      />
      {!isBountyTitleValid && bountyTitle.length !== 0 ? (
        <HelperText type="error">{`Exceeding maximum reasoning length`}</HelperText>
      ) : null}
      <Padder scale={1} />

      <InputLabel
        label={'Bounty Requested Allocation:'}
        helperText={
          'How much should be paid out for completed Bounty. Upon funding, the amount will be reserved in treasury.'
        }
      />
      <TextInput
        mode="outlined"
        dense
        keyboardType="decimal-pad"
        placeholder="Bounty requested allocation"
        value={bountyAllocation}
        onChangeText={(value) => {
          SetBountyAllocation(decimalKeypad(value));
        }}
        contextMenuHidden={true}
        right={<TextInput.Affix text={formatBalance(stringToBn(bountyAllocation)) ?? ''} />}
      />
      {!isBountyValid ? (
        <HelperText type="info">{`Minimum bounty reward is: ${formatBalance(bounty?.bountyValueMinimum)}`}</HelperText>
      ) : null}
      <Padder scale={1} />

      <InputLabel label={'Bounty Bond:'} helperText={'Proposer bond depends on bounty title length.'} />
      <TextInput mode="outlined" dense placeholder="Bounty Bond" value={formatBalance(calculatedBountyBond)} disabled />
      <Padder scale={1} />

      <InputLabel
        label={'Submit with account:'}
        helperText={'This account will propose the bounty. Bond amount will be reserved on its balance.'}
      />
      <SelectAccount onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)} />
      <Padder scale={2} />
      <View style={styles.row}>
        <Button mode="outlined" onPress={onClose}>
          Cancel
        </Button>
        <Button mode="outlined" disabled={disabled} onPress={submitBounty}>
          Submit Bounty
        </Button>
      </View>
      <Padder scale={2} />
    </Layout>
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
    paddingHorizontal: standardPadding * 2,
    paddingVertical: standardPadding * 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
