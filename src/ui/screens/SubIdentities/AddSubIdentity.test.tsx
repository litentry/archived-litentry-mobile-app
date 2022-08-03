import React from 'react';
import {render, fireEvent, waitFor} from 'src/testUtils';
import {AddSubIdentity} from './AddSubIdentity';

const mockCloseModal = jest.fn();
const mockAddSubIdentity = jest.fn();

jest.mock('src/hooks/useIsAddressValid', () => {
  return {
    useIsAddressValid: () => ({
      isValid: true,
    }),
  };
});

describe('AddSubIdentity', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the AddSubIdentity component', async () => {
    const {findByText, findByPlaceholderText} = render(
      <AddSubIdentity onClose={mockCloseModal} onAddPress={mockAddSubIdentity} />,
    );
    await findByPlaceholderText('Sub account name (optional)');
    await findByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
    await findByText('Cancel');
    await findByText('Add Identity');
  });

  it('should close the bottom-sheets when pressed on cancel button', async () => {
    const {findByText} = render(<AddSubIdentity onClose={mockCloseModal} onAddPress={mockAddSubIdentity} />);
    await findByText('Cancel');
    fireEvent.press(await findByText('Cancel'));
    expect(mockCloseModal).toBeCalledTimes(1);
  });

  it('should call onAddPress with the right arguments when the form is valid and Add Identity button is pressed', async () => {
    const {getByText, findByPlaceholderText, findByTestId} = render(
      <AddSubIdentity onClose={mockCloseModal} onAddPress={mockAddSubIdentity} />,
    );

    const addIdentityButton = await findByTestId('add-identity-button');
    fireEvent.changeText(await findByPlaceholderText('Sub account name (optional)'), 'Sub-account');
    fireEvent.changeText(
      await findByPlaceholderText('👉 Paste address here, e.g. 167r...14h'),
      '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
    );

    waitFor(() => {
      expect(addIdentityButton).toBeEnabled();
    });

    fireEvent.press(getByText('Add Identity'));
    expect(mockAddSubIdentity).toBeCalledWith({
      address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
      display: 'Sub-account',
    });
  });
});
