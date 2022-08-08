import React from 'react';
import {render} from 'src/testUtils';
import {ErrorText} from './ErrorText';

test('should render with children data', () => {
  const {getByText} = render(<ErrorText>Mocked Error Text</ErrorText>);

  expect(getByText('Mocked Error Text')).not.toBeNull();
});

test('snapshot match', () => {
  const errorTextComponent = render(<ErrorText>Mocked Error Text</ErrorText>);
  const tree = errorTextComponent.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <View
      collapsable={false}
      pointerEvents="box-none"
      style={
        Object {
          "flex": 1,
        }
      }
    >
      <Text
        style={
          Array [
            Object {
              "color": "#1b1b1f",
            },
            Object {
              "textAlign": "left",
            },
            Array [
              Object {
                "textAlign": "center",
              },
              Object {
                "color": "#ba1a1a",
              },
            ],
          ]
        }
      >
        Mocked Error Text
      </Text>
    </View>
  `);
});
