import {NavigationProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {TechnicalCommitteeScreen} from './TechnicalCommitteeScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<AppStackParamList>;

describe('TechnicalCommitteeScreen', () => {
  it('should render the loading component when data is fetching', () => {
    const {getByTestId} = render(<TechnicalCommitteeScreen />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the TechnicalCommitteeScreen component when data is fetched', async () => {
    const {findByText} = render(<TechnicalCommitteeScreen />);
    await findByText(
      'The Technical Committee can, along with the Council, produce emergency referenda, which are fast-tracked for voting and implementation.',
    );
    await findByText(
      'Members are added or removed from the Technical Committee via a simple majority vote of the Council.',
    );
    await findByText('Members');
    await findByText('3');
    await findByText('Active proposals');
    await findByText('0');
    await findByText('Total proposals');
    await findByText('49');
    await findByText('W3F/🦾');
    await findByText('Parity/🦾');
    await findByText('Parity/🦿');
  });

  it('should navigate to account details screen on press of a technical committee', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<TechnicalCommitteeScreen />);
    await findByText('Members');
    fireEvent.press(await findByText('Parity/🦿'));
    waitFor(() => {
      expect(navigationSpy).toBeCalledTimes(1);
    });
  });
});
