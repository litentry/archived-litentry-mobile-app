import {logger} from 'react-native-logs';
import {ansiColorConsoleSync} from 'react-native-logs/dist/transports/ansiColorConsoleSync';
import Reactotron from 'reactotron-react-native';

export const createLogger = (name: string) => {
  const log = logger.createLogger({
    transport: ansiColorConsoleSync,
    transportOptions: {hideDate: true, loggerName: name},
  });

  if (__DEV__) {
    log.setSeverity('debug');
  } else {
    log.setSeverity('error');
  }

  return log;
};

export const ReactotronDebug = Reactotron.debug;
