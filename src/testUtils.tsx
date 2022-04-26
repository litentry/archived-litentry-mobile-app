/* eslint-disable no-restricted-imports */
import React from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import fetch from 'cross-fetch';

import ThemeProvider from 'context/ThemeContext';
import {create, TestRendererOptions} from 'react-test-renderer';

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

function customCreate(ui: React.ReactElement, options?: TestRendererOptions) {
  return create(ui, options);
}

export * from '@testing-library/react-native';
export {customRender as render};
export {customCreate as create};
