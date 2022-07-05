import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import {MnemonicScreen} from './MnemonicScreen';
import React from 'react';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const mnemonic = 'west bar upon arena all remove return era local spoon edge use';

const mockgenerateMnemonic = jest.fn(() => Promise.resolve({mnemonic: mnemonic}));

jest.mock('@polkadotApi/useCryptoUtil', () => {
  return {
    useCryptoUtil: () => ({
      generateMnemonic: mockgenerateMnemonic,
    }),
  };
});

describe('MnemonicScreen', () => {
  it('should render the MnemonicScreen component', async () => {
    const {findAllByText} = render(<MnemonicScreen navigation={navigation} />);
    await findAllByText('Mnemonic seed');
    await findAllByText(
      'Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.',
    );
    await findAllByText('Next');
  });

  it('should navigate to on press of next button', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<MnemonicScreen navigation={navigation} />);
    fireEvent.press(await findByText('Next'));
    expect(navigationSpy).toHaveBeenCalledWith('Verify Mnemonic', {mnemonic: mnemonic});
  });
});
