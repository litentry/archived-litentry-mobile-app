/* eslint-disable no-restricted-imports */

import React from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import fetch from 'cross-fetch';
import ThemeProvider from 'context/ThemeContext';
import {LitentryApiClientProvider} from 'context/LitentryApiContext';
import {RecoilRoot} from 'recoil';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri: 'http://localhost:3000/graphql', fetch}),
});

// TODO: https://github.com/litentry/litentry-app/issues/1275
function Providers({children}: {children: React.ReactNode}) {
  return (
    <RecoilRoot>
      <LitentryApiClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </LitentryApiClientProvider>
    </RecoilRoot>
  );
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>;

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
  return render(ui, {wrapper: Providers, ...options});
}

export * from '@testing-library/react-native';
export {customRender as render};
