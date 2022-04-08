import React from 'react';
import {View, Text, Button} from 'react-native';
import {useWeb3Wallet} from 'context/Web3WalletContext';

export function TokenMigrationScreen() {
  const wallet = useWeb3Wallet();
  const [isApproving, setApproving] = React.useState(false);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const litmusAddress = '5DkLmfqQDZtDpN2SiEMvVeTJuq8zW7pan2c4LqN3EV6deB64'; // TODO: select address from internal accounts
  const ethAddress = '0x838C543187312cc85592f43a35b03A7aCb8B273a'; // TODO: select address from web3 accounts
  const hasApproved = wallet.isConnected ? wallet.connectedAccount?.approved.isGreaterThan(0) : false;
  const [txHash, setTxHash] = React.useState('');

  const handleApprove = React.useCallback(async () => {
    if (!wallet.isConnected) {
      throw new Error('The wallet must be connected to call this method');
    }
    setApproving(true);
    const result = await wallet.approveForMigration(ethAddress);
    if (result?.ok) {
      wallet.updateAccount(ethAddress);
    }
    if (result?.error) {
      // TODO: handle error
      console.error(result.error);
    }
    setApproving(false);
  }, [wallet]);

  const onSubmit = React.useCallback(async () => {
    if (!wallet.isConnected) {
      throw new Error('The wallet must be connected to call this method');
    }
    setSubmitting(true);
    const result = await wallet.depositForMigration(ethAddress, 1, litmusAddress);
    if (result?.ok) {
      wallet.updateAccount(ethAddress);
      setTxHash(result.ok);
    }
    if (result?.error) {
      // TODO: handle error
      console.error(result.error);
    }
    setSubmitting(false);
  }, [wallet]);

  if (isApproving) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>approving...</Text>
      </View>
    );
  }

  if (isSubmitting) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>submitting...</Text>
      </View>
    );
  }

  if (txHash) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Your transaction has been successfully submitted.</Text>
        <Text>View transaction {txHash} on Etherscan.io</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Token Migration</Text>
      {!wallet.isConnected ? (
        <>
          <Button title="Connect Wallet" onPress={() => wallet.connect()} />
        </>
      ) : (
        <View>
          <Button title="Disconnect Wallet" onPress={() => wallet.disconnect()} />
          <Button title="Update account" onPress={() => wallet.updateAccount(ethAddress)} />
          {hasApproved ? <Text>Approved!!</Text> : <Button title="Approve" onPress={handleApprove} />}
          {hasApproved ? <Button title="deposit migration" onPress={onSubmit} /> : null}
        </View>
      )}
    </View>
  );
}