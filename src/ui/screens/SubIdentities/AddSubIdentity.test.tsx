import React from 'react';
import {render, fireEvent} from 'src/testUtils';
import {AddSubIdentity} from './AddSubIdentity';

const bottomSheetModal = {
  dismiss: jest.fn(),
};

const addSubIdentity = {
  subIdentity: jest.fn(),
};

describe('AddSubIdentity', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the AddSubIdentity component', async () => {
    const {findByText, findByPlaceholderText} = render(
      <AddSubIdentity onClose={bottomSheetModal.dismiss} onAddPress={addSubIdentity.subIdentity} />,
    );
    await findByPlaceholderText('Sub account name (optional)');
    await findByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
    await findByText('Cancel');
    await findByText('Add Identity');
  });

  it('should close the bottom-sheets when pressed on cancel button', async () => {
    const bottomSheetsSpy = jest.spyOn(bottomSheetModal, 'dismiss');
    const {findByText} = render(
      <AddSubIdentity onClose={bottomSheetModal.dismiss} onAddPress={addSubIdentity.subIdentity} />,
    );
    await findByText('Cancel');
    fireEvent.press(await findByText('Cancel'));
    expect(bottomSheetsSpy).toBeCalledTimes(1);
  });

  it('should call onAddPress with the right arguments when the form is valid and Add Identity button is pressed', async () => {
    const addSubIdentitySpy = jest.spyOn(addSubIdentity, 'subIdentity');
    const {getByText, findByPlaceholderText, findByTestId} = render(
      <AddSubIdentity onClose={bottomSheetModal.dismiss} onAddPress={addSubIdentity.subIdentity} />,
    );
    const addIdentityButton = await findByTestId('add-identity-button');
    expect(addIdentityButton).toBeDisabled();
    fireEvent.changeText(await findByPlaceholderText('Sub account name (optional)'), 'Sub-account');
    fireEvent.changeText(
      await findByPlaceholderText('👉 Paste address here, e.g. 167r...14h'),
      '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
    );
    expect(addIdentityButton).toBeEnabled();
    fireEvent.press(getByText('Add Identity'));
    expect(addSubIdentitySpy).toBeCalledWith({
      address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
      display: 'Sub-account',
    });
  });
});
