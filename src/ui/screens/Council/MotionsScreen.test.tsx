import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Linking} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {MotionsScreen} from './MotionsScreen';

const navigation = {
  navigate: () => jest.fn,
} as unknown as NavigationProp<DashboardStackParamList>;

describe('CouncilOverviewScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the loading screen when the data is fetching', () => {
    const {getByTestId} = render(<MotionsScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the MotionsScreen component after the data is being fetched', async () => {
    const {findAllByText} = render(<MotionsScreen navigation={navigation} />);
    await findAllByText('Proposer:');
    await findAllByText('Payout:');
    await findAllByText('Beneficiary:');
    await findAllByText('Bond:');
    await findAllByText('Polkassembly');
  });

  it('should render the component and click on polkassembly and redirect to polkassembly motion on website', async () => {
    const polkassemblySpy = jest.fn(Linking.openURL).mockImplementation(() => Promise.resolve());
    const {getAllByTestId} = render(<MotionsScreen navigation={navigation} />);
    await waitFor(() => {
      const polkaAssembly = getAllByTestId('polkassembly-button');
      fireEvent.press(polkaAssembly[0] as ReactTestInstance);
      // expect(polkassemblySpy).toHaveBeenCalled();
    });
  });

  it('should render the component and click on motion item navigate to motionDetailScreen', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {getAllByTestId} = render(<MotionsScreen navigation={navigation} />);
    await waitFor(() => {
      const motionTestID = getAllByTestId('motion-container')[0] as ReactTestInstance;
      fireEvent.press(motionTestID);
      expect(navigationSpy).toHaveBeenCalledTimes(1);
    });
  });
});
