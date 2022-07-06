import React, {useReducer} from 'react';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent, waitFor} from 'src/testUtils';
import {DemocracyProposalScreen, reducer, State} from './DemocracyProposalScreen';
import {democracyProposalScreen} from '@ui/navigation/routeKeys';
import {Account} from 'src/api/hooks/useAccount';
import {ReactTestInstance} from 'react-test-renderer';
import {debug} from 'react-native-reanimated';

jest.useFakeTimers();

const route = {
  params: {
    proposal: {
      __typename: 'SubstrateChainDemocracyProposal',
      index: '73',
      balance: '10000000000',
      formattedBalance: '0.0100 KSM',
      seconds: [
        {
          __typename: 'SubstrateChainAccountInfo',
          account: {
            __typename: 'SubstrateChainAccount',
            address: 'EPPNDdGn4kEPeHzdGPzJ3seYw3AmKENpuVzpT2JyD87FCPA',
            display: 'Shiden Network',
            hasIdentity: true,
            registration: {
              __typename: 'SubstrateChainDeriveAccountRegistration',
              display: 'Shiden Network',
              displayParent: null,
              email: 'admin@stake.co.jp',
              image: null,
              legal: null,
              pgp: null,
              riot: null,
              twitter: '@ShidenNetwork',
              web: 'https://shiden.astar.network/',
              judgements: [],
            },
            balance: {
              __typename: 'SubstrateChainAccountBalance',
              total: '63807505269504',
              formattedTotal: '63.8075 KSM',
              reserved: '59508729798536',
              formattedReserved: '59.5087 KSM',
              free: '4298775470968',
              formattedFree: '4.2987 KSM',
              feeFrozen: '0',
              formattedFeeFrozen: '0.0000 KSM',
            },
          },
        },
        {
          __typename: 'SubstrateChainAccountInfo',
          account: {
            __typename: 'SubstrateChainAccount',
            address: 'EPPNDdGn4kEPeHzdGPzJ3seYw3AmKENpuVzpT2JyD87FCPA',
            display: 'Shiden Network',
            hasIdentity: true,
            registration: {
              __typename: 'SubstrateChainDeriveAccountRegistration',
              display: 'Shiden Network',
              displayParent: null,
              email: 'admin@stake.co.jp',
              image: null,
              legal: null,
              pgp: null,
              riot: null,
              twitter: '@ShidenNetwork',
              web: 'https://shiden.astar.network/',
              judgements: [],
            },
            balance: {
              __typename: 'SubstrateChainAccountBalance',
              total: '63807505269504',
              formattedTotal: '63.8075 KSM',
              reserved: '59508729798536',
              formattedReserved: '59.5087 KSM',
              free: '4298775470968',
              formattedFree: '4.2987 KSM',
              feeFrozen: '0',
              formattedFeeFrozen: '0.0000 KSM',
            },
          },
        },
      ],
      meta: 'Send a batch of dispatch calls.',
      method: 'batch',
      section: 'utility',
      hash: '0x66cb3ecc23fd2ef262f8f451e4f0e0dfcfd2e276b3438dc800522df4863659db',
      proposer: {
        __typename: 'SubstrateChainAccountInfo',
        account: {
          __typename: 'SubstrateChainAccount',
          address: 'EPPNDdGn4kEPeHzdGPzJ3seYw3AmKENpuVzpT2JyD87FCPA',
          display: 'Shiden Network',
          hasIdentity: true,
          registration: {
            __typename: 'SubstrateChainDeriveAccountRegistration',
            display: 'Shiden Network',
            displayParent: null,
            email: 'admin@stake.co.jp',
            image: null,
            legal: null,
            pgp: null,
            riot: null,
            twitter: '@ShidenNetwork',
            web: 'https://shiden.astar.network/',
            judgements: [],
          },
          balance: {
            __typename: 'SubstrateChainAccountBalance',
            total: '63807505269504',
            formattedTotal: '63.8075 KSM',
            reserved: '59508729798536',
            formattedReserved: '59.5087 KSM',
            free: '4298775470968',
            formattedFree: '4.2987 KSM',
            feeFrozen: '0',
            formattedFeeFrozen: '0.0000 KSM',
          },
        },
      },
      args: [
        {
          __typename: 'SubstrateChainProposalArg',
          name: 'calls',
          type: 'Vec<Call>',
          value: 'SubCalls',
          subCalls: [
            {
              __typename: 'SubstrateChainProposalSubCall',
              meta: 'Exactly as transfer, except the origin must be root and the source account may be specified. ',
              method: 'forceTransfer',
              section: 'balances',
              args: [
                {
                  __typename: 'SubstrateChainProposalArg',
                  name: 'source',
                  type: 'MultiAddress',
                  value: 'F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29',
                },
                {
                  __typename: 'SubstrateChainProposalArg',
                  name: 'dest',
                  type: 'MultiAddress',
                  value: 'F7fq1jSNVTPfJmaHaXCMtatT1EZefCUsa7rRiQVNR5efcah',
                },
                {
                  __typename: 'SubstrateChainProposalArg',
                  name: 'value',
                  type: 'Compact<u128>',
                  value: '1000000000000',
                },
              ],
            },
          ],
        },
      ],
    },
  },
} as unknown as RouteProp<DashboardStackParamList, typeof democracyProposalScreen>;

const mockStartTx = jest.fn();

jest.mock('src/api/hooks/useApiTx', () => {
  return {
    useApiTx: () => mockStartTx,
  };
});

describe('DemocracyProposalScreen', () => {
  it('render the loading view when data is fetching', async () => {
    const {findByText} = render(<DemocracyProposalScreen route={route} />);
    await findByText('73');
    await findByText('batch.utility');
    await findByText('Send a batch of dispatch calls.');
    await findByText('Proposal Hash:');
    await findByText('0x66cb3ecc23fd2ef262f8f451e4f0e0dfcfd2e276b3438dc800522df4863659db');
    await findByText('Proposer:');
    await findByText('Shiden Network');
    await findByText('Locked:');
    await findByText('0.0100 KSM');
    await findByText('Seconds:');
    await findByText('2');
    await findByText('Second');
    await findByText(
      `The proposal is in the queue for future referendums. One proposal from this list will move forward to voting.`,
    ),
      await findByText('Seconding a proposal that indicates your backing for the proposal.');
  });

  it('should open voting model when pressed on second button', async () => {
    const {findByText, findByTestId} = render(<DemocracyProposalScreen route={route} />);
    fireEvent.press(await findByText('Second'));
    await findByText('Vote with account');
    await findByText('Deposit required:');
    await findByText('Cancel');
    expect(await findByTestId('second-button')).toBeDisabled();
    fireEvent.press(await findByText('Cancel'));
  });

  it('should open voting model and vote by pressing second ', async () => {
    const {findByText, findByTestId, findAllByTestId, debug} = render(<DemocracyProposalScreen route={route} />);
    fireEvent.press(await findByText('Second'));
    await findByText('Vote with account');

    const secondButton = await findByTestId('second-button');

    expect(secondButton).toBeDisabled();

    const selectAccount = await findByTestId('select-account');
    fireEvent.press(selectAccount);

    const accountItem = await findByText('Test account name');
    fireEvent.press(accountItem);

    expect(secondButton).toBeEnabled();

    fireEvent.press(secondButton);

    expect(mockStartTx).toHaveBeenCalledWith({
      address: 'G7UkJAutjbQyZGRiP8z5bBSBPBJ66JbTKAkFDq3cANwENyX',
      params: ['73'],
      txMethod: 'democracy.second',
    });
  });
});
