import {afterAll, afterEach, beforeAll} from '@jest/globals';
import {apolloClient} from 'context/LitentryApiContext';
import fetch from 'cross-fetch';
import {server} from '../mocks/server';

// required to implement fetch within node tests
global.fetch = fetch;

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({onUnhandledRequest: 'error'});
});

beforeEach(() => {
  if (apolloClient != null) {
    apolloClient.clearStore();
  }
});
// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
afterEach(() => server.resetHandlers());

// // Clean up after the tests are finished.
afterAll(() => server.close());
