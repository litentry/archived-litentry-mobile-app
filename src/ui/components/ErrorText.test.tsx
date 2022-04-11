/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import {create} from 'react-test-renderer';
import {render} from 'src/testUtils';
import {ErrorText} from './ErrorText';

jest.doMock('./ErrorText', () => {
  return {
    ErrorTextMockComponent: jest.fn(() => <ErrorText>Mocked Error Text</ErrorText>),
  };
});
const {ErrorTextMockComponent} = require('./ErrorText');

describe('ErrorText component', () => {
  it('should render the prop component correctly', async () => {
    const {getByTestId} = render(<ErrorTextMockComponent />);
    expect(getByTestId('error_text').children.at(0)).toEqual('Mocked Error Text');
  });

  it('Testing render with snapshot', () => {
    const errorTextComponent = create(<ErrorTextMockComponent />);
    const tree = errorTextComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
