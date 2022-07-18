import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {referendumScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {ReferendumScreen} from './ReferendumScreen';

jest.useFakeTimers();

const mockStartTx = jest.fn();

jest.mock('src/api/hooks/useApiTx', () => {
  return {
    useApiTx: () => mockStartTx,
  };
});

const route = {
  params: {
    referendum: {
      __typename: 'SubstrateChainDemocracyReferendum',
      activatePeriod: ['10 days', '23 hrs', '45 mins', '18 s'],
      args: [
        {__typename: 'SubstrateChainProposalArg', name: 'para', subCalls: [Array], type: 'u32', value: '2102'},
        {
          __typename: 'SubstrateChainProposalArg',
          name: 'newHead',
          subCalls: [Array],
          type: 'Bytes',
          value: '0x00000000000000000000000000000000…b157e78786d8c082f29dcf4c11131400',
        },
      ],
      ayePercent: 8.72,
      endPeriod: ['2 days', '23 hrs', '45 mins', '12 s'],
      formattedVotedAye: '1,083.6752 KSM',
      formattedVotedNay: '9,668.4994 KSM',
      hash: '0x3ad9336915ecedeca1a1e491ea9f83c678f15b52b75923c3bc155505e0cdba66',
      imageHash: '0x3ad9336915ecedeca1a1e491ea9f83c678f15b52b75923c3bc155505e0cdba66',
      index: '211',
      meta: 'Set the storage for the current parachain head data immediately.',
      method: 'forceSetCurrentHead',
      section: 'paras',
      voteCountAye: '143',
      voteCountNay: '757',
      votedAye: '1083675270000000',
      votedNay: '9668499491849423',
    },
  },
} as unknown as RouteProp<DashboardStackParamList, typeof referendumScreen>;

describe('ReferendumScreen', () => {
  it('should render the ReferendumScreen component with initial data', async () => {
    const {findByText} = render(<ReferendumScreen route={route} />);
    await findByText('211');
    await findByText('Set the storage for the current parachain head data immediately.');
    await findByText('forceSetCurrentHead.paras()');
    await findByText('Proposal Hash:');
    await findByText('0x3ad9336915ecedeca1a1e491ea9f83c678f15b52b75923c3bc155505e0cdba66');
    await findByText('Time left to vote');
    await findByText('211');
    await findByText('Time left to activate');
    await findByText('211');
    await findByText('Live Results');
    await findByText('YES');
    await findByText('NO');
    await findByText('143 participants');
    await findByText('757 participants');
    await findByText('Vote!');
    await findByText('Vote No');
    await findByText('Vote Yes');
  });

  it('should open a model to vote yes/no when pressed on yes/no button and close the model by pressing cancel', async () => {
    const {findByText, findByTestId} = render(<ReferendumScreen route={route} />);
    await findByText('211');
    fireEvent.press(await findByText('Vote No'));
    await findByText('Vote with account');
    await findByText('Vote Value');
    await findByText('Conviction');
    await findByText('Cancel');
    await findByText('Vote No');
    expect(await findByTestId('vote-button')).toBeDisabled();
    fireEvent.press(await findByText('Vote No'));
  });
});
