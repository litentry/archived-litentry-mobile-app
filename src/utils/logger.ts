import {consoleTransport, logger} from 'react-native-logs';

export const createLogger = (name: string) => {
  const log = logger.createLogger({
    transport: consoleTransport,
    transportOptions: {hideDate: true, loggerName: name},
  });

  if (__DEV__) {
    log.setSeverity('debug');
  } else {
    log.setSeverity('error');
  }

  return log;
};
