import React from 'react';
import {create} from 'react-test-renderer';
import {render} from 'src/testUtils';
import {ErrorText} from './ErrorText';

describe('ErrorText component', () => {
  it('should render the prop component correctly', async () => {
    const {getByText} = render(<ErrorText>Mocked Error Text</ErrorText>);
    expect(getByText('Mocked Error Text')).toBeTruthy();
  });

  it('Testing render with snapshot', () => {
    const errorTextComponent = create(<ErrorText>Mocked Error Text</ErrorText>);
    const tree = errorTextComponent.toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <Text
        style={
          Array [
            Object {
              "color": "#000000",
              "fontFamily": "System",
              "fontWeight": "400",
            },
            Object {
              "textAlign": "left",
            },
            Array [
              Object {
                "textAlign": "center",
              },
              Object {
                "color": "#B00020",
              },
            ],
          ]
        }
      >
        Mocked Error Text
      </Text>
    `);
  });
});
