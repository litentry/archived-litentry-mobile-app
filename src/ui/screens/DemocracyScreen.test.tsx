import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {fireEvent, render} from 'src/testUtils';
import {DemocracyScreen} from './DemocracyScreen';
import {ReactTestInstance} from 'react-test-renderer';
import {Linking} from 'react-native';

jest.useFakeTimers();

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<DashboardStackParamList>;

describe('DemocracyScreen', () => {
  it('should render the loading component when data is fetching', () => {
    const {getByTestId} = render(<DemocracyScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render DemocracyScreen component when the data is fetched', async () => {
    const {findByText, findAllByText} = render(<DemocracyScreen navigation={navigation} />);
    await findByText('Referenda');
    await findByText('#211');
    await findByText('forceSetCurrentHead.paras()');
    await findByText('5 days 5 hrs');
    await findByText('Proposals');
    await findByText('#73');
    await findByText('batch.utility()');
    await findByText('Balance:');
    await findByText('0.0100 KSM');
    await findByText('Proposer:');
    await findByText('Shiden Network');
    await findByText('Set the storage for the current parachain head data immediately.');
    await findByText('Submit proposal');
    await findAllByText('Polkassembly');
    await findAllByText('Submit proposal');
  });

  it('should open the polkassembly webpage when pressed on Polkassembly', async () => {
    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    const {findAllByText} = render(<DemocracyScreen navigation={navigation} />);
    fireEvent.press((await findAllByText('Polkassembly'))[0] as ReactTestInstance);
    expect(linkingSpy).toBeCalledWith('https://polkadot.polkassembly.io/referendum/211');
  });

  it('should open submit proposal model when pressed on submit proposal', async () => {
    const {findByText, findAllByText, findByTestId} = render(<DemocracyScreen navigation={navigation} />);
    fireEvent.press(await findByText('Submit proposal'));
    await findAllByText('Submit proposal');
    await findAllByText('Select account');
    await findByText('PreImage Hash');
    await findByText('Locked Balance');
    await findByText('Minimum deposit: 100.0000 DOT');
    await findByText('Cancel');
    expect(await findByTestId('proposal-button')).toBeDisabled();
    fireEvent.press(await findByText('Cancel'));
  });
});
