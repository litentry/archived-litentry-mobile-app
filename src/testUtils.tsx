/* eslint-disable no-restricted-imports */

import React from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import ThemeProvider from 'context/ThemeContext';
import {RecoilRoot} from 'recoil';
import {LitentryApiClientProvider} from 'context/LitentryApiContext';

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
