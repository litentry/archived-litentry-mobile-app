/* eslint-disable no-restricted-imports */
import React from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import fetch from 'cross-fetch';

// import {LitentryApiClientProvider} from 'context/LitentryApiContext';
import ThemeProvider from 'context/ThemeContext';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

export * from '@testing-library/react-native';
export {customRender as render};