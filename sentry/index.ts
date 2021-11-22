import * as Sentry from '@sentry/react-native';

const SENTRY_DSN = 'https://8e1eb9f09ffe4e11a45f55a97eda0da9@o734864.ingest.sentry.io/6072101';

const isDev = __DEV__;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.3,
  enabled: !isDev,
});

export default Sentry;
