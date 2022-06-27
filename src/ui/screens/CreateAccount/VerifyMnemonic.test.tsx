import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import React from 'react';
import {VerifyMnemonicScreen} from './VerifyMnemonic';
import {verifyMnemonicScreen} from '@ui/navigation/routeKeys';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    mnemonic: 'west bar upon arena all remove return era local spoon edge use',
  },
} as RouteProp<AccountsStackParamList, typeof verifyMnemonicScreen>;

describe('VerifyMnemonicScreen', () => {
  it('should render the VerifyMnemonicScreen component', async () => {
    const {findByText, findAllByText, findByTestId} = render(
      <VerifyMnemonicScreen navigation={navigation} route={route} />,
    );
    const nextButton = await findByTestId('next-button');
    await findByText('Verify your mnemonic by selecting the words in the correct order.');
    await findAllByText('Mnemonic seed');
    await findByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should press reset button to erase all entered mnemonic seeds', async () => {
    const {findByText, findByTestId} = render(<VerifyMnemonicScreen navigation={navigation} route={route} />);
    const nextButton = await findByTestId('next-button');
    await findByText('Next');
    expect(nextButton).toBeDisabled();
    fireEvent.press(await findByText('west'));
    fireEvent.press(await findByText('bar'));
    fireEvent.press(await findByText('upon'));
    fireEvent.press(await findByText('arena'));
    fireEvent.press(await findByText('all'));
    fireEvent.press(await findByText('remove'));
    fireEvent.press(await findByText('return'));
    fireEvent.press(await findByText('era'));
    fireEvent.press(await findByText('local'));
    fireEvent.press(await findByText('spoon'));
    fireEvent.press(await findByText('edge'));
    fireEvent.press(await findByText('use'));
    expect(nextButton).toBeEnabled();
    fireEvent.press(await findByText('Reset'));
    expect(nextButton).toBeDisabled();
  });

  it('should press next button after entering right mnemonic seeds', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText, findByTestId} = render(<VerifyMnemonicScreen navigation={navigation} route={route} />);
    const nextButton = await findByTestId('next-button');
    await findByText('Next');
    expect(nextButton).toBeDisabled();
    fireEvent.press(await findByText('west'));
    fireEvent.press(await findByText('bar'));
    fireEvent.press(await findByText('upon'));
    fireEvent.press(await findByText('arena'));
    fireEvent.press(await findByText('all'));
    fireEvent.press(await findByText('remove'));
    fireEvent.press(await findByText('return'));
    fireEvent.press(await findByText('era'));
    fireEvent.press(await findByText('local'));
    fireEvent.press(await findByText('spoon'));
    fireEvent.press(await findByText('edge'));
    fireEvent.press(await findByText('use'));
    expect(nextButton).toBeEnabled();
    fireEvent.press(nextButton);
    expect(navigationSpy).toBeCalledWith('Create Account', {
      mnemonic: 'west bar upon arena all remove return era local spoon edge use',
    });
  });
});
