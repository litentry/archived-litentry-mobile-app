import React from 'react';
import {render, waitFor, within} from 'src/testUtils';
import {DemocracySummaryTeaser} from './DemocracySummaryTeaser';

const onPressEvent = jest.fn();

describe('DemocracySummaryTeaser component', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<DemocracySummaryTeaser onPress={onPressEvent} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the component with the data', async () => {
    const {getByTestId} = await waitFor(() => render(<DemocracySummaryTeaser onPress={onPressEvent} />));
    const activeProposal = getByTestId('activeProposals_id');
    expect(within(activeProposal).getByText('0')).toBeTruthy();
    const proposals = getByTestId('proposals_id');
    expect(within(proposals).getByText('17')).toBeTruthy();
    const referendums = getByTestId('referendums_id');
    expect(within(referendums).getByText('60')).toBeTruthy();
    const activeReferendums = getByTestId('activeReferendums_id');
    expect(within(activeReferendums).getByText('1')).toBeTruthy();
    const progressChart = getByTestId('progress_chart_id');
    expect(within(progressChart).getByText('87% 3 days 10 hrs')).toBeTruthy();
  });

  it('DemocracySummaryTeaser snapshot', async () => {
    const componentTree = await waitFor(() => render(<DemocracySummaryTeaser onPress={onPressEvent} />).toJSON());
    expect(componentTree).toMatchInlineSnapshot(`
      <View
        collapsable={false}
        pointerEvents="box-none"
        style={
          Object {
            "flex": 1,
          }
        }
      >
        <View
          collapsable={false}
          style={
            Object {
              "backgroundColor": "#ffffff",
              "borderColor": "rgba(0, 0, 0, 0.12)",
              "borderRadius": 10,
              "elevation": 1,
              "shadowColor": "#000000",
              "shadowOffset": Object {
                "height": 0.5,
                "width": 0,
              },
              "shadowOpacity": 0.24,
              "shadowRadius": 0.75,
            }
          }
        >
          <View
            accessibilityState={
              Object {
                "disabled": false,
              }
            }
            accessible={true}
            focusable={true}
            onClick={[Function]}
            onResponderGrant={[Function]}
            onResponderMove={[Function]}
            onResponderRelease={[Function]}
            onResponderTerminate={[Function]}
            onResponderTerminationRequest={[Function]}
            onStartShouldSetResponder={[Function]}
            style={
              Object {
                "flexGrow": 1,
                "flexShrink": 1,
              }
            }
          >
            <View
              style={
                Array [
                  Object {
                    "alignItems": "center",
                    "flexDirection": "row",
                    "justifyContent": "space-between",
                    "paddingLeft": 16,
                  },
                  Object {
                    "minHeight": 72,
                  },
                  undefined,
                ]
              }
            >
              <View
                style={
                  Array [
                    Object {
                      "flex": 1,
                      "flexDirection": "column",
                      "justifyContent": "center",
                    },
                  ]
                }
              >
                <Text
                  numberOfLines={1}
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
                          "color": "rgba(0, 0, 0, 0.87)",
                          "fontFamily": "System",
                          "fontWeight": "500",
                          "writingDirection": "ltr",
                        },
                        Array [
                          Object {
                            "fontSize": 20,
                            "letterSpacing": 0.15,
                            "lineHeight": 30,
                            "marginVertical": 2,
                          },
                          Array [
                            Object {
                              "minHeight": 30,
                              "paddingRight": 16,
                            },
                            Object {
                              "marginBottom": 2,
                            },
                            undefined,
                          ],
                        ],
                      ],
                    ]
                  }
                >
                  Democracy
                </Text>
              </View>
              <View>
                <View
                  style={
                    Object {
                      "marginRight": 8,
                    }
                  }
                >
                  <Text
                    allowFontScaling={false}
                    selectable={false}
                    style={
                      Array [
                        Object {
                          "color": "#000000",
                          "fontSize": 30,
                        },
                        undefined,
                        Object {
                          "fontFamily": "Material Design Icons",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                        },
                        Object {},
                      ]
                    }
                  >
                    󰅂
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={
                Array [
                  Object {
                    "paddingHorizontal": 16,
                  },
                  Object {
                    "paddingBottom": 16,
                  },
                  undefined,
                ]
              }
            >
              <View
                style={
                  Object {
                    "flexDirection": "row",
                  }
                }
              >
                <View
                  collapsable={false}
                  style={
                    Object {
                      "backgroundColor": "#ffffff",
                      "borderColor": "rgba(0, 0, 0, 0.12)",
                      "borderRadius": 4,
                      "borderWidth": 1,
                      "elevation": 0,
                      "flex": 1,
                      "padding": 16,
                    }
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
                      Object {
                        "flexGrow": 1,
                        "flexShrink": 1,
                      }
                    }
                  >
                    <View
                      index={0}
                      siblings={
                        Array [
                          "View",
                          "View",
                        ]
                      }
                      style={
                        Object {
                          "alignItems": "center",
                          "flexDirection": "row",
                          "justifyContent": "space-between",
                          "marginBottom": 16,
                        }
                      }
                      total={2}
                    >
                      <View
                        testID="activeProposals_id"
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
                          Proposals
                        </Text>
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
                                  Object {
                                    "fontSize": 16,
                                    "textAlign": "left",
                                  },
                                ],
                              ],
                            ]
                          }
                        >
                          0
                        </Text>
                      </View>
                      <View
                        testID="proposals_id"
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
                          Total
                        </Text>
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
                                  Object {
                                    "fontSize": 16,
                                    "textAlign": "left",
                                  },
                                ],
                              ],
                            ]
                          }
                        >
                          17
                        </Text>
                      </View>
                    </View>
                    <View
                      index={1}
                      siblings={
                        Array [
                          "View",
                          "View",
                        ]
                      }
                      style={
                        Object {
                          "alignItems": "center",
                          "flexDirection": "row",
                          "justifyContent": "space-between",
                          "marginBottom": 16,
                        }
                      }
                      total={2}
                    >
                      <View
                        testID="activeReferendums_id"
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
                          Referenda
                        </Text>
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
                                  Object {
                                    "fontSize": 16,
                                    "textAlign": "left",
                                  },
                                ],
                              ],
                            ]
                          }
                        >
                          1
                        </Text>
                      </View>
                      <View
                        testID="referendums_id"
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
                          Total
                        </Text>
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
                                  Object {
                                    "fontSize": 16,
                                    "textAlign": "left",
                                  },
                                ],
                              ],
                            ]
                          }
                        >
                          60
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={
                    Object {
                      "padding": 1.6,
                    }
                  }
                />
                <View
                  collapsable={false}
                  style={
                    Object {
                      "backgroundColor": "#ffffff",
                      "borderColor": "rgba(0, 0, 0, 0.12)",
                      "borderRadius": 4,
                      "borderWidth": 1,
                      "elevation": 0,
                      "flex": 1,
                      "padding": 16,
                    }
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
                      Object {
                        "flexGrow": 1,
                        "flexShrink": 1,
                      }
                    }
                  >
                    <View
                      style={
                        Object {
                          "justifyContent": "center",
                        }
                      }
                      testID="progress_chart_id"
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
                                Object {
                                  "textAlign": "center",
                                },
                              ],
                            ],
                          ]
                        }
                      >
                        Launch period
                      </Text>
                      <View
                        style={
                          Object {
                            "alignItems": "center",
                            "justifyContent": "center",
                            "paddingTop": 8,
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
                                  Object {
                                    "bottom": 0,
                                    "left": "39%",
                                    "position": "absolute",
                                    "right": 0,
                                    "top": "25%",
                                    "zIndex": 1,
                                  },
                                ],
                              ],
                            ]
                          }
                        >
                          87%
      3 days
      10 hrs
                        </Text>
                        <View
                          style={
                            Object {
                              "height": 100,
                              "padding": 0,
                              "width": 100,
                            }
                          }
                        >
                          <RNSVGSvgView
                            bbHeight={100}
                            bbWidth={100}
                            focusable={false}
                            height={100}
                            style={
                              Array [
                                Object {
                                  "backgroundColor": "transparent",
                                  "borderWidth": 0,
                                },
                                Object {
                                  "flex": 0,
                                  "height": 100,
                                  "width": 100,
                                },
                              ]
                            }
                            width={100}
                          >
                            <RNSVGGroup>
                              <RNSVGDefs>
                                <RNSVGLinearGradient
                                  gradient={
                                    Array [
                                      0,
                                      16777215,
                                      1,
                                      16777215,
                                    ]
                                  }
                                  gradientTransform={null}
                                  gradientUnits={1}
                                  name="backgroundGradient"
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                />
                                <RNSVGLinearGradient
                                  gradient={
                                    Array [
                                      0,
                                      452895567,
                                      1,
                                      452895567,
                                    ]
                                  }
                                  gradientTransform={null}
                                  gradientUnits={1}
                                  name="fillShadowGradientFrom"
                                  x1={0}
                                  x2={0}
                                  y1={0}
                                  y2={100}
                                />
                              </RNSVGDefs>
                              <RNSVGRect
                                fill={
                                  Array [
                                    1,
                                    "backgroundGradient",
                                  ]
                                }
                                height={100}
                                propList={
                                  Array [
                                    "fill",
                                  ]
                                }
                                rx={0}
                                ry={0}
                                width="100%"
                                x={0}
                                y={0}
                              />
                              <RNSVGGroup
                                matrix={
                                  Array [
                                    1,
                                    0,
                                    -0,
                                    1,
                                    50,
                                    50,
                                  ]
                                }
                              >
                                <RNSVGGroup>
                                  <RNSVGPath
                                    d="M 0 -44 A 44 44 0 1 1 -0.276458 -43.999131 L -0.276458 -43.999131 A 44 44 0 1 0 0 -44 Z "
                                    propList={
                                      Array [
                                        "stroke",
                                        "strokeWidth",
                                      ]
                                    }
                                    stroke={872325967}
                                    strokeWidth={12}
                                  />
                                </RNSVGGroup>
                                <RNSVGGroup>
                                  <RNSVGPath
                                    d="M 0 -44 A 44 44 0 1 1 -32.07462 -30.120073 L -32.07462 -30.120073 A 44 44 0 1 0 0 -44 Z "
                                    propList={
                                      Array [
                                        "stroke",
                                        "strokeWidth",
                                        "strokeLinecap",
                                        "strokeLinejoin",
                                      ]
                                    }
                                    stroke={2164171599}
                                    strokeLinecap={1}
                                    strokeLinejoin={1}
                                    strokeWidth={12}
                                  />
                                </RNSVGGroup>
                              </RNSVGGroup>
                            </RNSVGGroup>
                          </RNSVGSvgView>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    `);
  });
});
