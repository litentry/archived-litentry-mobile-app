import React from 'react';
import {render} from 'src/testUtils';
import {ErrorText} from './ErrorText';

test('should render with children data', async () => {
  const {findByText} = render(<ErrorText>Mocked Error Text</ErrorText>);
  expect(await findByText('Mocked Error Text')).toBeTruthy();
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
                  "color": "#E55047",
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
