/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import fetch from 'cross-fetch';

import ThemeProvider from 'context/ThemeContext';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri: 'http://localhost:3000/graphql', fetch}),
});

function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>;

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
  return render(ui, {wrapper: Providers, ...options});
}

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  };
});

jest.mock('react-native-qrcode-scanner/node_modules/react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return {
    default: mockComponent('react-native/Libraries/Components/Switch/Switch'),
  };
});

export * from '@testing-library/react-native';
export {customRender as render};
