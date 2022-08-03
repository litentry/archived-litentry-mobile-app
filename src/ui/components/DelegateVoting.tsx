import React from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import {Subheading, Caption, useBottomSheetInternal, Button, Select, Paragraph} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {Account, useAccount} from 'src/api/hooks/useAccount';
import {AccountTeaser} from './Account/AccountTeaser';
import {InputLabel} from '@ui/library/InputLabel';
import {AddressInput} from '@ui/components/AddressInput';
import PagerView from 'react-native-pager-view';
import {useConvictions, Conviction} from 'src/api/hooks/useConvictions';
import {BalanceInput} from '@ui/components/BalanceInput';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {BN_ZERO} from '@polkadot/util';
import {formattedStringToBn} from 'src/utils/balance';

type Page = {
  index: number;
  type: 'SELECT_ACCOUNT' | 'SELECT_AMOUNT' | 'PREVIEW';
};

const PAGES: Page[] = [
  {index: 0, type: 'SELECT_ACCOUNT'},
  {index: 1, type: 'SELECT_AMOUNT'},
  {index: 2, type: 'PREVIEW'},
];

type DelegateVotingProps = {
  fromAccount: Account;
  onClose: () => void;
};

export function DelegateVoting({fromAccount, onClose}: DelegateVotingProps) {
  const {data: convictions} = useConvictions();
  const {stringToBn, formatBalance} = useFormatBalance();
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();
  const [isDelegatedAccountValid, setIsDelegatedAccountValid] = React.useState(false);
  const [delegatedAccount, setDelegatedAccount] = React.useState<string>();
  const [conviction, setConviction] = React.useState<Conviction>();
  const [delegateAmount, setDelegateAmount] = React.useState<string>();
  const pagerRef = React.useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const {data: delegatedAccountInfo} = useAccount(delegatedAccount);

  const handleOnFocus = React.useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);

  const handleOnBlur = React.useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  const previousPage = React.useCallback(() => {
    const page = currentPage - 1;
    pagerRef.current?.setPage(page);
    setCurrentPage(page);
  }, [currentPage]);

  const nextPage = React.useCallback(() => {
    const page = currentPage + 1;
    pagerRef.current?.setPage(page);
    setCurrentPage(page);
  }, [currentPage]);

  const delegateAmountBn = React.useMemo(() => {
    if (delegateAmount) {
      return stringToBn(delegateAmount) ?? BN_ZERO;
    }
    return BN_ZERO;
  }, [delegateAmount, stringToBn]);

  const fromAccountFreeBalanceBN = React.useMemo(
    () => formattedStringToBn(fromAccount.balance?.free),
    [fromAccount.balance?.free],
  );

  const disabled =
    !isDelegatedAccountValid ||
    !conviction ||
    !delegateAmountBn.gt(BN_ZERO) ||
    delegateAmountBn.gt(fromAccountFreeBalanceBN);

  const delegateVote = React.useCallback(() => {
    if (delegatedAccount && conviction && delegateAmountBn.gt(BN_ZERO)) {
      console.log('Voting delegation');
    }
  }, [delegatedAccount, conviction, delegateAmountBn]);

  const onCancel = React.useCallback(() => {
    setDelegatedAccount(undefined);
    setConviction(undefined);
    setDelegateAmount(undefined);
    onClose();
  }, [onClose]);

  return (
    <Layout style={styles.container}>
      <Subheading style={globalStyles.textCenter}>{`Delegate voting`}</Subheading>
      <Padder scale={2} />

      <PagerView
        showPageIndicator
        style={styles.pagerContainer}
        initialPage={0}
        pageMargin={standardPadding}
        ref={pagerRef}
        scrollEnabled={false}>
        {PAGES.map((page) => (
          <View key={page.index}>
            {(() => {
              switch (page.type) {
                case 'SELECT_ACCOUNT':
                  return (
                    <View style={styles.pagerItem}>
                      <View style={globalStyles.rowAlignCenter}>
                        <InputLabel
                          label="Delegating from"
                          helperText="The account you delegate your voting power from"
                        />
                        <Padder />
                        <AccountTeaser account={fromAccount} />
                      </View>
                      <Padder scale={2} />

                      <InputLabel label="Delegating to" helperText="The account you delegate your voting power to" />
                      <AddressInput
                        onValidateAddress={setIsDelegatedAccountValid}
                        onAddressChanged={setDelegatedAccount}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                      />
                    </View>
                  );

                case 'SELECT_AMOUNT':
                  return (
                    <View style={styles.pagerItem}>
                      <Caption>{`Conviction`}</Caption>
                      <Select
                        items={convictions ?? []}
                        onSelect={(_conviction) => {
                          setConviction(_conviction);
                        }}
                      />
                      <Padder />

                      <InputLabel
                        label="Delegating amount"
                        helperText="The amount will be applied to all the votes made on referendum by the delegated account"
                      />
                      <BalanceInput
                        account={fromAccount}
                        onChangeBalance={setDelegateAmount}
                        initialBalance={delegateAmount}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                      />
                    </View>
                  );

                case 'PREVIEW':
                  return (
                    <View style={[styles.pagerItem, globalStyles.alignCenter]}>
                      <Row label={'Delegate'}>
                        <Paragraph>{formatBalance(delegateAmountBn, {isShort: true})}</Paragraph>
                      </Row>
                      <Row label={'Conviction'}>
                        <Paragraph>{conviction?.text}</Paragraph>
                      </Row>
                      <Row label={'Delegating from'}>
                        <AccountTeaser account={fromAccount} />
                      </Row>
                      <Row label={'Delegating to'}>
                        {delegatedAccountInfo ? <AccountTeaser account={delegatedAccountInfo} /> : null}
                      </Row>
                    </View>
                  );
              }
            })()}
          </View>
        ))}
      </PagerView>

      <Padder />
      <View style={globalStyles.spaceAroundRowContainer}>
        <Button mode="outlined" onPress={currentPage === 0 ? onCancel : previousPage}>
          {`${currentPage === 0 ? 'Cancel' : 'Back'}`}
        </Button>
        <Button
          disabled={currentPage === PAGES.length - 1 && disabled}
          mode="outlined"
          onPress={PAGES.length - 1 === currentPage ? delegateVote : nextPage}>{`${
          PAGES.length - 1 === currentPage ? 'Delegate' : 'Next'
        }`}</Button>
      </View>

      <Padder scale={3} />
    </Layout>
  );
}

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Paragraph style={styles.rowLabel}>{label}:</Paragraph>
      <View style={globalStyles.flex}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  pagerContainer: {
    flex: 1,
  },
  pagerItem: {
    paddingHorizontal: standardPadding * 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: standardPadding,
  },
  rowLabel: {
    width: '37%',
  },
});
