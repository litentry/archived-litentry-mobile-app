import React from 'react';
import Balances from '@ui/components/Balances';
import {create, ReactTestInstance} from 'react-test-renderer';
import {render, within} from 'src/testUtils';

const accountBalanceDetails = {
  formattedFree: '56.7291 DOT',
  formattedFreeFrozen: '0.0000 DOT',
  formattedReserved: '140.2990 DOT',
  formattedTotal: '197.0281 DOT',
  free: '567291998369',
  freeFrozen: '0',
  reserved: '1402990000000',
  total: '1970281998369',
};

describe('Balances component', () => {
  it('should render the prop component correctly', async () => {
    const {queryByText, queryAllByText} = render(<Balances balance={accountBalanceDetails} />);

    const total_balance = queryByText('Total Balance');
    expect(within(total_balance as ReactTestInstance).getByText('Total Balance')).toBeTruthy();

    const formattedFree = queryByText('56.7291 DOT');
    expect(within(formattedFree as ReactTestInstance).getByText('56.7291 DOT')).toBeTruthy();

    const transferrable = queryByText('Transferrable');
    expect(within(transferrable as ReactTestInstance).getByText('Transferrable')).toBeTruthy();

    const reserved = queryByText('Reserved');
    expect(within(reserved as ReactTestInstance).getByText('Reserved')).toBeTruthy();

    const locked = queryByText('Locked');
    expect(within(locked as ReactTestInstance).getByText('Locked')).toBeTruthy();
  });

  it('Testing render with snapshot', () => {
    const errorTextComponent = create(<Balances balance={accountBalanceDetails} />);
    expect(errorTextComponent.toJSON()).toMatchInlineSnapshot(`
      <View
        style={
          Array [
            Object {
              "backgroundColor": "#f6f6f6",
            },
            undefined,
          ]
        }
      >
        <View
          accessibilityState={
            Object {
              "disabled": true,
            }
          }
          accessible={true}
          focusable={false}
          onClick={[Function]}
          onResponderGrant={[Function]}
          onResponderMove={[Function]}
          onResponderRelease={[Function]}
          onResponderTerminate={[Function]}
          onResponderTerminationRequest={[Function]}
          onStartShouldSetResponder={[Function]}
          style={
            Array [
              false,
              Array [
                Object {
                  "padding": 8,
                },
                undefined,
              ],
            ]
          }
          testID="total_balance"
        >
          <View
            style={
              Object {
                "flexDirection": "row",
              }
            }
          >
            <View
              style={
                Array [
                  Object {
                    "marginVertical": 6,
                    "paddingLeft": 8,
                  },
                  Object {
                    "flex": 1,
                    "justifyContent": "center",
                  },
                ]
              }
            >
              <Text
                numberOfLines={1}
                selectable={false}
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
                        "fontSize": 16,
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.87)",
                      },
                      undefined,
                    ],
                  ]
                }
              >
                Total Balance
              </Text>
            </View>
            <View
              style={
                Object {
                  "justifyContent": "center",
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
                        "textAlign": "left",
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.54)",
                        "fontFamily": "System",
                        "fontWeight": "400",
                        "writingDirection": "ltr",
                      },
                      Array [
                        Object {
                          "fontSize": 12,
                          "letterSpacing": 0.4,
                          "lineHeight": 20,
                          "marginVertical": 2,
                        },
                        undefined,
                      ],
                    ],
                  ]
                }
              >
                197.0281 DOT
              </Text>
            </View>
          </View>
        </View>
        <View
          accessibilityState={
            Object {
              "disabled": true,
            }
          }
          accessible={true}
          focusable={false}
          onClick={[Function]}
          onResponderGrant={[Function]}
          onResponderMove={[Function]}
          onResponderRelease={[Function]}
          onResponderTerminate={[Function]}
          onResponderTerminationRequest={[Function]}
          onStartShouldSetResponder={[Function]}
          style={
            Array [
              false,
              Array [
                Object {
                  "padding": 8,
                },
                undefined,
              ],
            ]
          }
          testID="transferrable"
        >
          <View
            style={
              Object {
                "flexDirection": "row",
              }
            }
          >
            <View
              style={
                Array [
                  Object {
                    "marginVertical": 6,
                    "paddingLeft": 8,
                  },
                  Object {
                    "flex": 1,
                    "justifyContent": "center",
                  },
                ]
              }
            >
              <Text
                numberOfLines={1}
                selectable={false}
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
                        "fontSize": 16,
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.87)",
                      },
                      undefined,
                    ],
                  ]
                }
              >
                Transferrable
              </Text>
            </View>
            <View
              style={
                Object {
                  "justifyContent": "center",
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
                        "textAlign": "left",
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.54)",
                        "fontFamily": "System",
                        "fontWeight": "400",
                        "writingDirection": "ltr",
                      },
                      Array [
                        Object {
                          "fontSize": 12,
                          "letterSpacing": 0.4,
                          "lineHeight": 20,
                          "marginVertical": 2,
                        },
                        undefined,
                      ],
                    ],
                  ]
                }
              >
                56.7291 DOT
              </Text>
            </View>
          </View>
        </View>
        <View
          accessibilityState={
            Object {
              "disabled": true,
            }
          }
          accessible={true}
          focusable={false}
          onClick={[Function]}
          onResponderGrant={[Function]}
          onResponderMove={[Function]}
          onResponderRelease={[Function]}
          onResponderTerminate={[Function]}
          onResponderTerminationRequest={[Function]}
          onStartShouldSetResponder={[Function]}
          style={
            Array [
              false,
              Array [
                Object {
                  "padding": 8,
                },
                undefined,
              ],
            ]
          }
          testID="reserved"
        >
          <View
            style={
              Object {
                "flexDirection": "row",
              }
            }
          >
            <View
              style={
                Array [
                  Object {
                    "marginVertical": 6,
                    "paddingLeft": 8,
                  },
                  Object {
                    "flex": 1,
                    "justifyContent": "center",
                  },
                ]
              }
            >
              <Text
                numberOfLines={1}
                selectable={false}
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
                        "fontSize": 16,
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.87)",
                      },
                      undefined,
                    ],
                  ]
                }
              >
                Reserved
              </Text>
            </View>
            <View
              style={
                Object {
                  "justifyContent": "center",
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
                        "textAlign": "left",
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.54)",
                        "fontFamily": "System",
                        "fontWeight": "400",
                        "writingDirection": "ltr",
                      },
                      Array [
                        Object {
                          "fontSize": 12,
                          "letterSpacing": 0.4,
                          "lineHeight": 20,
                          "marginVertical": 2,
                        },
                        undefined,
                      ],
                    ],
                  ]
                }
              >
                140.2990 DOT
              </Text>
            </View>
          </View>
        </View>
        <View
          accessibilityState={
            Object {
              "disabled": true,
            }
          }
          accessible={true}
          focusable={false}
          onClick={[Function]}
          onResponderGrant={[Function]}
          onResponderMove={[Function]}
          onResponderRelease={[Function]}
          onResponderTerminate={[Function]}
          onResponderTerminationRequest={[Function]}
          onStartShouldSetResponder={[Function]}
          style={
            Array [
              false,
              Array [
                Object {
                  "padding": 8,
                },
                undefined,
              ],
            ]
          }
          testID="locked"
        >
          <View
            style={
              Object {
                "flexDirection": "row",
              }
            }
          >
            <View
              style={
                Array [
                  Object {
                    "marginVertical": 6,
                    "paddingLeft": 8,
                  },
                  Object {
                    "flex": 1,
                    "justifyContent": "center",
                  },
                ]
              }
            >
              <Text
                numberOfLines={1}
                selectable={false}
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
                        "fontSize": 16,
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.87)",
                      },
                      undefined,
                    ],
                  ]
                }
              >
                Locked
              </Text>
            </View>
            <View
              style={
                Object {
                  "justifyContent": "center",
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
                        "textAlign": "left",
                      },
                      Object {
                        "color": "rgba(0, 0, 0, 0.54)",
                        "fontFamily": "System",
                        "fontWeight": "400",
                        "writingDirection": "ltr",
                      },
                      Array [
                        Object {
                          "fontSize": 12,
                          "letterSpacing": 0.4,
                          "lineHeight": 20,
                          "marginVertical": 2,
                        },
                        undefined,
                      ],
                    ],
                  ]
                }
              >
                0.0000 DOT
              </Text>
            </View>
          </View>
        </View>
      </View>
    `);
  });
});
