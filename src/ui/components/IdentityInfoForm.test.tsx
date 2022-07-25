import React from 'react';
import {IdentityInfoForm} from '@ui/components/IdentityInfoForm';
import {render, fireEvent, waitFor} from 'src/testUtils';

const mockOnIdentitySet = jest.fn();

const mockStartTx = jest.fn(() => Promise.resolve({}));

jest.mock('context/TxContext', () => {
  return {
    useStartTx: () => ({
      startTx: mockStartTx,
    }),
  };
});

describe('IdentityInfoForm', () => {
  it('should submit identity info when submit button enabled', async () => {
    const {findByTestId} = render(
      <IdentityInfoForm onIdentitySet={mockOnIdentitySet} address="14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a" />,
    );
    waitFor(async () => {
      fireEvent.changeText(await findByTestId('display-name'), 'PureStake/01');
      const identitySubmitButton = await findByTestId('identity-submit-button');
      expect(identitySubmitButton).toBeEnabled();
      fireEvent.press(identitySubmitButton);
      expect(mockStartTx).toHaveBeenCalledTimes(1);
      expect(mockStartTx).toHaveBeenCalledWith({
        address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
        txConfig: {
          params: [
            {
              display: {raw: 'PureStake/01'},
              email: {none: null},
              legal: {none: null},
              riot: {none: null},
              twitter: {none: null},
              web: {none: null},
            },
          ],
          method: 'identity.setIdentity',
        },
      });
    });
  });
});
