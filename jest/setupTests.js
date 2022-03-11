import {beforeAll, afterEach, afterAll} from '@jest/globals';
import {server} from '../mocks/server';

// required to implement fetch within node tests
global.fetch = require('node-fetch');

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
