import React from 'react';
import {Alert} from 'react-native';
import {render, fireEvent} from 'src/testUtils';
import {AddExternalAccount} from './AddExternalAccount';
jest.useFakeTimers();

const closeModel = () => jest.fn;

describe('AddExternalAccount', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render the AddExternalAccount component, test for wrong address', () => {
    const {getByPlaceholderText} = render(<AddExternalAccount onClose={closeModel} />);
    const inputAddress = getByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
    fireEvent.changeText(inputAddress, 'test');
    jest.spyOn(Alert, 'alert');
  });

  it('should render the AddExternalAccount component, with right address', async () => {
    const {findByPlaceholderText, getAllByA11yRole} = render(<AddExternalAccount onClose={closeModel} />);
    const confirm = getAllByA11yRole('button')[3];
    const inputAddress = await findByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
    expect(inputAddress).toBeTruthy();
    expect(confirm).toBeDisabled();
    fireEvent.changeText(inputAddress, '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    expect(confirm).toHaveTextContent('Confirm');
    expect(confirm).toBeEnabled();
  });

  it('should render the AddExternalAccount component', () => {
    const {getAllByA11yRole} = render(<AddExternalAccount onClose={closeModel} />);
    const cancel = getAllByA11yRole('button')[2];
    expect(cancel).toHaveTextContent('Cancel');
    const confirm = getAllByA11yRole('button')[3];
    expect(confirm).toHaveTextContent('Confirm');
    expect(confirm).toBeDisabled();
  });
});
