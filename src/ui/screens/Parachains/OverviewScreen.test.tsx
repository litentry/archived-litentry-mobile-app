import {NavigationProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {ReactTestInstance} from 'react-test-renderer';
import {render, waitFor, within} from 'src/testUtils';
import {ParachainsOverviewScreen} from './OverviewScreen';

let navigation: NavigationProp<ParachainsStackParamList>;

describe('OverviewScreen component', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<ParachainsOverviewScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('render the component when data arrives', async () => {
    const {getAllByTestId} = await waitFor(() => render(<ParachainsOverviewScreen navigation={navigation} />));
    const parachainItems = getAllByTestId('parachain_items');
    expect(parachainItems.length).toBe(10);
    expect(within(parachainItems[0] as ReactTestInstance).getByText('Statemint')).toBeTruthy();
    expect(within(parachainItems[9] as ReactTestInstance).getByText('Nodle')).toBeTruthy();
  });

  it('DemocracySummaryTeaser snapshot', async () => {
    const componentTree = await waitFor(() => render(<ParachainsOverviewScreen navigation={navigation} />).toJSON());
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
          style={
            Array [
              Object {
                "backgroundColor": "#f6f6f6",
              },
              Object {
                "flex": 1,
              },
            ]
          }
        >
          <RNCSafeAreaView
            edges={
              Array [
                "left",
                "right",
                "bottom",
              ]
            }
            style={
              Object {
                "flex": 1,
              }
            }
          >
            <RCTScrollView
              ItemSeparatorComponent={
                Object {
                  "$$typeof": Symbol(react.forward_ref),
                  "render": [Function],
                }
              }
              ListHeaderComponent={[Function]}
              contentContainerStyle={
                Object {
                  "padding": 16,
                }
              }
              data={
                Array [
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "1000",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "1130 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 20",
                    },
                    "name": "Statemint",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2000",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "542 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 13",
                    },
                    "name": "Acala",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2002",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "542 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 13",
                    },
                    "name": "Clover",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2004",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "542 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 13",
                    },
                    "name": "Moonbeam",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2006",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "542 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 13",
                    },
                    "name": "Astar",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2011",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "Equilibrium",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2012",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "542 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 13",
                    },
                    "name": "Parallel",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2019",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "Composable Finance",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2021",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "Efinity",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2026",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "Nodle",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2031",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "Centrifuge",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2032",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "Interlay",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2034",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "HydraDX",
                  },
                  Object {
                    "__typename": "SubstrateChainParachain",
                    "id": "2035",
                    "lease": Object {
                      "__typename": "SubstrateChainLease",
                      "blockTime": Array [
                        "626 days",
                        "21 hrs",
                        "21 mins",
                        "42 s",
                      ],
                      "period": "7 - 14",
                    },
                    "name": "Phala Network",
                  },
                ]
              }
              getItem={[Function]}
              getItemCount={[Function]}
              keyExtractor={[Function]}
              onContentSizeChange={[Function]}
              onLayout={[Function]}
              onMomentumScrollBegin={[Function]}
              onMomentumScrollEnd={[Function]}
              onScroll={[Function]}
              onScrollBeginDrag={[Function]}
              onScrollEndDrag={[Function]}
              removeClippedSubviews={false}
              renderItem={[Function]}
              scrollEventThrottle={50}
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={Array []}
              viewabilityConfigCallbackPairs={Array []}
            >
              <View>
                <View
                  onLayout={[Function]}
                >
                  <View
                    collapsable={false}
                    style={
                      Object {
                        "backgroundColor": "#ffffff",
                        "borderColor": "rgba(0, 0, 0, 0.12)",
                        "borderRadius": 4,
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
                          Array [
                            Object {
                              "paddingHorizontal": 16,
                            },
                            Object {
                              "paddingVertical": 16,
                            },
                            undefined,
                          ]
                        }
                      >
                        <View
                          style={
                            Array [
                              Object {
                                "alignItems": "center",
                                "flexDirection": "row",
                                "justifyContent": "space-between",
                                "marginBottom": 16,
                              },
                              Object {
                                "marginHorizontal": 16,
                              },
                            ]
                          }
                        >
                          <View>
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
                              Parachains
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
                              14
                            </Text>
                          </View>
                          <View>
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
                              Parathreads
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
                              14
                            </Text>
                          </View>
                        </View>
                        <View
                          style={
                            Array [
                              Object {
                                "backgroundColor": "rgba(0, 0, 0, 0.12)",
                                "height": 0.5,
                              },
                              undefined,
                              undefined,
                            ]
                          }
                        />
                        <View
                          style={
                            Object {
                              "padding": 8,
                            }
                          }
                        />
                        <View
                          style={
                            Object {
                              "alignItems": "center",
                              "flexDirection": "row",
                              "justifyContent": "space-between",
                              "marginBottom": 16,
                            }
                          }
                        >
                          <View
                            style={
                              Object {
                                "flex": 1,
                                "flexDirection": "row",
                                "justifyContent": "space-between",
                              }
                            }
                          >
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
                                        Object {
                                          "textAlign": "center",
                                        },
                                      ],
                                    ],
                                  ]
                                }
                              >
                                Lease Period
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
                                  
      53%
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
                                            d="M 0 -44 A 44 44 0 1 1 -0 -44 L -0 -44 A 44 44 0 1 0 0 -44 Z "
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
                            <View>
                              <View>
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
                                  Current lease
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
                                  7
                                </Text>
                              </View>
                              <View>
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
                                  84 days
                                </Text>
                              </View>
                              <View>
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
                                  Remainder
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
                                  38 days 21 hrs
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={
                      Object {
                        "padding": 8,
                      }
                    }
                  />
                  <View
                    style={
                      Object {
                        "flexDirection": "row",
                        "justifyContent": "space-around",
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
                              "color": "rgba(0, 0, 0, 0.87)",
                              "fontFamily": "System",
                              "fontWeight": "400",
                              "writingDirection": "ltr",
                            },
                            Array [
                              Object {
                                "fontSize": 16,
                                "letterSpacing": 0.5,
                                "lineHeight": 24,
                                "marginVertical": 2,
                              },
                              undefined,
                            ],
                          ],
                        ]
                      }
                    >
                      Parachains
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
                              "color": "rgba(0, 0, 0, 0.87)",
                              "fontFamily": "System",
                              "fontWeight": "400",
                              "writingDirection": "ltr",
                            },
                            Array [
                              Object {
                                "fontSize": 16,
                                "letterSpacing": 0.5,
                                "lineHeight": 24,
                                "marginVertical": 2,
                              },
                              undefined,
                            ],
                          ],
                        ]
                      }
                    >
                      Leases
                    </Text>
                  </View>
                  <View
                    style={
                      Object {
                        "padding": 8,
                      }
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          1000
                        </Text>
                      </View>
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
                          Statemint
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 20
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          1130 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "1000",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "1130 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 20",
                        },
                        "name": "Statemint",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2000
                        </Text>
                      </View>
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
                          Acala
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 13
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          542 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2000",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "542 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 13",
                        },
                        "name": "Acala",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2002
                        </Text>
                      </View>
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
                          Clover
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 13
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          542 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2002",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "542 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 13",
                        },
                        "name": "Clover",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2004
                        </Text>
                      </View>
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
                          Moonbeam
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 13
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          542 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2004",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "542 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 13",
                        },
                        "name": "Moonbeam",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2006
                        </Text>
                      </View>
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
                          Astar
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 13
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          542 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2006",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "542 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 13",
                        },
                        "name": "Astar",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2011
                        </Text>
                      </View>
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
                          Equilibrium
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 14
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          626 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2011",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "626 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 14",
                        },
                        "name": "Equilibrium",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2012
                        </Text>
                      </View>
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
                          Parallel
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 13
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          542 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2012",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "542 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 13",
                        },
                        "name": "Parallel",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2019
                        </Text>
                      </View>
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
                          Composable Finance
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 14
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          626 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2019",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "626 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 14",
                        },
                        "name": "Composable Finance",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2021
                        </Text>
                      </View>
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
                          Efinity
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 14
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          626 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2021",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "626 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 14",
                        },
                        "name": "Efinity",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  onLayout={[Function]}
                  style={null}
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
                    testID="parachain_items"
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
                          2026
                        </Text>
                      </View>
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
                          Nodle
                        </Text>
                      </View>
                      <View
                        style={
                          Object {
                            "marginRight": 8,
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
                              undefined,
                            ]
                          }
                        >
                          7 - 14
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
                              Object {
                                "flexDirection": "row",
                              },
                            ]
                          }
                        >
                          626 days 21 hrs
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    highlighted={false}
                    leadingItem={
                      Object {
                        "__typename": "SubstrateChainParachain",
                        "id": "2026",
                        "lease": Object {
                          "__typename": "SubstrateChainLease",
                          "blockTime": Array [
                            "626 days",
                            "21 hrs",
                            "21 mins",
                            "42 s",
                          ],
                          "period": "7 - 14",
                        },
                        "name": "Nodle",
                      }
                    }
                    style={
                      Array [
                        Object {
                          "backgroundColor": "rgba(0, 0, 0, 0.12)",
                          "height": 0.5,
                        },
                        undefined,
                        undefined,
                      ]
                    }
                  />
                </View>
                <View
                  style={
                    Object {
                      "height": 0,
                    }
                  }
                />
              </View>
            </RCTScrollView>
          </RNCSafeAreaView>
        </View>
      </View>
    `);
  });
});
