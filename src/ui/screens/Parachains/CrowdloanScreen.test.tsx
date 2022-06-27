import {NavigationProp} from '@react-navigation/native';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {ReactTestInstance} from 'react-test-renderer';
import {fireEvent, render} from 'src/testUtils';
import {CrowdloanScreen} from './CrowdloanScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<CrowdloansStackParamList>;

describe('CrowdloanScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the loading component view when data is fetching', () => {
    const {getByTestId} = render(<CrowdloanScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the CrowdloanScreen component with fetched data', async () => {
    const {findByText, findAllByText} = render(<CrowdloanScreen navigation={navigation} />);
    await findByText('Active Raised / Cap');
    await findByText('4 MDOT / 33 MDOT');
    await findByText('Total Raised / Cap');
    await findByText('131 MDOT / 492 MDOT');
    await findByText('Ongoing (2)');
    await findByText('Completed (2)');
    await findAllByText('Litentry');
    await findAllByText('Geminis');
  });

  it('should navigate to crowdloan fund screes on press of ongoing or completed crowdloan', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findAllByText} = render(<CrowdloanScreen navigation={navigation} />);
    fireEvent.press((await findAllByText('Litentry'))[0] as ReactTestInstance);
    expect(navigationSpy).toBeCalledWith('Fund Detail', {paraId: '2013', title: 'Litentry'});
  });

  it('should open contribute model on press on contribution button', async () => {
    const {findAllByTestId, findByText, findByTestId} = render(<CrowdloanScreen navigation={navigation} />);
    const contribute = (await findAllByTestId('crowdloan-contribute-button'))[0] as ReactTestInstance;
    fireEvent.press(contribute);
    await findByText('Contribute with');
    await findByText('Amount');
    await findByText('Minimum allowed');
    await findByText('5.0000 DOT');
    expect(await findByTestId('cancel-button')).toBeEnabled();
    expect(await findByTestId('contribute-button')).toBeDisabled();
  });
});
