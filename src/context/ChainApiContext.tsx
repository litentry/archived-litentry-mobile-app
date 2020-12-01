import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {NetworkContext} from './NetworkContext';
import {ApiPromise, WsProvider} from '@polkadot/api';
import {createLogger} from 'src/utils';
import {formatBalance, BN_ZERO} from '@polkadot/util';

type ApiChainStatusType = 'unknown' | 'connected' | 'disconnected' | 'ready';
type ChainApiContextValueType = {
  status: ApiChainStatusType;
  error: Error | null;
  api: ApiPromise | null;
  addSection: (section: string) => void;
  removeSection: (section: string) => void;
};

export const ChainApiContext = createContext<ChainApiContextValueType>({
  api: null,
  status: 'unknown',
  error: null,
  addSection: () => undefined,
  removeSection: () => undefined,
});
type PropTypes = {children: React.ReactNode};

const logger = createLogger('ChainApiContext');

function ChainApiContextProvider(props: PropTypes) {
  const {children} = props;
  const [status, setStatus] = useState<ApiChainStatusType>('unknown');
  const [error, setError] = useState<Error | null>(null);
  const {currentNetwork} = useContext(NetworkContext);
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [sections, setSections] = useState<string[]>([]);
  const eventStreamHandlerRef = useRef<Function | null>(null);

  /**
   * Add section to watch, such as `identity`
   */
  const addSection = useCallback(
    (section: string) => {
      if (!sections.includes(section)) {
        setSections(sections.concat(section));
      }
    },
    [sections],
  );

  /**
   * Remove section from watch list
   */
  const removeSection = useCallback(
    (section: string) => {
      return setSections(sections.filter((s) => s !== section));
    },
    [sections],
  );

  // addSection /removeSection
  // addSubscription / removeSubscription
  useEffect(() => {
    if (currentNetwork) {
      try {
        logger.debug(
          `ChainApiContext: trying to connected to ${currentNetwork.ws}`,
        );
        const provider = new WsProvider(currentNetwork.ws);
        const apiPromise = new ApiPromise({provider});

        apiPromise.on('connected', () => {
          logger.debug('ChainApiContext: Api connected');
          setError(null);
          setStatus('connected');
        });

        apiPromise.on('disconnected', () => {
          logger.debug('ChainApiContext: Api disconnected');

          setError(null);
          setApi(null);
          setStatus('disconnected');
        });

        apiPromise.on('ready', () => {
          logger.debug('ChainApiContext: Api ready');
          setError(null);
          setStatus('ready');
          setApi(apiPromise);
        });

        apiPromise.on('error', (e: Error) => {
          setError(e);
        });
      } catch (e) {
        setError(e);
      }
    }
  }, [currentNetwork]);

  useEffect(() => {
    if (status === 'ready' && api) {
      if (eventStreamHandlerRef.current) {
        // unsub
        eventStreamHandlerRef.current();
      }

      // setup chain properties
      api.rpc.system.properties().then((properties) => {
        const tokenSymbol = properties.tokenSymbol
          .unwrapOr(undefined)
          ?.toString();
        const tokenDecimals = properties.tokenDecimals
          .unwrapOr(BN_ZERO)
          .toNumber();

        logger.info(
          `Chain Properties setup:\n${JSON.stringify(
            {
              decimals: tokenDecimals,
              unit: tokenSymbol,
            },
            null,
            4,
          )}`,
        );
        formatBalance.setDefaults({
          decimals: tokenDecimals,
          unit: tokenSymbol,
        });
      });

      logger.info(`Start waring chain events for "${sections.join(',')}"`);
      // @ts-ignore
      api.query.system
        .events((events) => {
          // Loop through the Vec<EventRecord>
          events.forEach((record) => {
            // Extract the phase, event and the event types
            const {event, phase} = record;
            const types = event.typeDef;

            if (sections.includes(event.section)) {
              logger.info(event.section);
            }
            // if (event.section === 'identity') {
            //   logger.info(JSON.stringify(event, null, 4));
            //   logger.info(
            //     `\t${event.section}:${
            //       event.method
            //     }:: (phase=${phase.toString()})`,
            //   );
            //
            //   logger.info(`\t\t${event.meta.documentation.toString()}`);
            //
            //   // Loop through each of the parameters, displaying the type and data
            //   event.data.forEach((data, index) => {
            //     logger.info(`\t\t\t${types[index].type}: ${data.toString()}`);
            //     console.log('data', data, index);
            //   });
            // }
          });
        })
        .then((unsub) => {
          eventStreamHandlerRef.current = unsub;
        });
    } else {
      eventStreamHandlerRef.current?.();
      eventStreamHandlerRef.current = null;
    }
  }, [currentNetwork, status, api, sections]);

  const value = useMemo(
    () => ({api, status, error, addSection, removeSection}),
    [status, error, api, addSection, removeSection],
  );

  return (
    <ChainApiContext.Provider value={value}>
      {children}
    </ChainApiContext.Provider>
  );
}

export default ChainApiContextProvider;
