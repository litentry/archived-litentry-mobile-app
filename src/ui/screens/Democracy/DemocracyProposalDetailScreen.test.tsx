import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {render} from 'src/testUtils';
import {DemocracyProposalDetailScreen} from './DemocracyProposalDetailScreen';

const route = {
  params: {
    id: 'polkadot:69',
  },
} as unknown as RouteProp<DashboardStackParamList, 'Proposal'>;

const mockStartTx = jest.fn(() => Promise.resolve({}));

jest.mock('context/TxContext', () => {
  return {
    useStartTx: () => ({
      startTx: mockStartTx,
    }),
  };
});

describe('DemocracyReferendumDetailScreen', () => {
  it('should render loading view', () => {
    const {getByTestId} = render(<DemocracyProposalDetailScreen route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });
});
