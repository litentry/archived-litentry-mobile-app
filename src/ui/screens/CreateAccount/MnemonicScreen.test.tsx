import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import {MnemonicScreen} from './MnemonicScreen';
import React from 'react';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

describe('MnemonicScreen', () => {
  it('render the MnemonicScreen component', async () => {
    const {findAllByText} = render(<MnemonicScreen navigation={navigation} />);
    await findAllByText('Generated mnemonic seed');
    await findAllByText(
      'Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.',
    );
    await findAllByText('Next');
  });

  it('click on next button', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<MnemonicScreen navigation={navigation} />);
    fireEvent.press(await findByText('Next'));
    expect(navigationSpy).toHaveBeenLastCalledWith('Verify Mnemonic', {mnemonic: 'random'});
  });
});
