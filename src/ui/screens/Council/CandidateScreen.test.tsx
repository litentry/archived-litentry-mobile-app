import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {CandidateScreen} from './CandidateScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn(),
  setOptions: () => jest.fn(),
} as unknown as NavigationProp<AppStackParamList>;

const route = {
  params: {
    candidate: {
      account: {
        address: '13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2',
        display: '🍺 Gav 🥃/🏛 Council 🏛',
      },
      backing: '137575256885404963',
      formattedBacking: '13.7575  MDOT',
      voters: [],
    },
    title: 'Prime voter',
  },
} as unknown as RouteProp<DashboardStackParamList, 'Candidate'>;

test('should render loading state when fetching data', () => {
  const {getByTestId} = render(<CandidateScreen navigation={navigation} route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('should render component when the data is fetched', async () => {
  const {getByText, getAllByText, getAllByTestId, debug} = render(
    <CandidateScreen navigation={navigation} route={route} />,
  );
  await waitFor(() => {
    debug();
  });
});
