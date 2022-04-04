import React from 'react';
import {create} from 'react-test-renderer';
import {render} from 'src/testUtils';
import {ErrorText} from './ErrorText';

describe('ErrorText component', () => {
  it('should render the prop component correctly', async () => {
    const testError = 'Test Data';
    const {getByTestId} = render(<ErrorText>{testError}</ErrorText>);
    expect(getByTestId('errorText')).toBeTruthy();
  });

  it('Testing render with snapshot', () => {
    const testError = 'Test Data';
    const errorTextComponent = create(<ErrorText>{testError}</ErrorText>);
    const tree = errorTextComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
