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
import {formatBalance} from '@polkadot/util';
import {setSS58Format} from '@polkadot/util-crypto';

type ApiChainStatusType = 'unknown' | 'connected' | 'disconnected' | 'ready';
type ChainApiContextValueType = {
  inProgress: boolean;
  status: ApiChainStatusType;
  error: Error | null;
  api: ApiPromise | null;
  addSection: (section: string) => void;
  removeSection: (section: string) => void;
};
import registry from 'src/typeRegistry';
import LoadingView from 'presentational/LoadingView';
import {Icon} from '@ui-kitten/components';
import globalStyles, {colorGreen} from 'src/styles';

export const DEFAULT_DECIMALS = registry.createType('u32', 15);
export const DEFAULT_SS58 = registry.createType('u32', 0);

export const ChainApiContext = createContext<ChainApiContextValueType>({
  api: null,
  status: 'unknown',
  error: null,
  addSection: () => undefined,
  removeSection: () => undefined,
  inProgress: false,
});
type PropTypes = {children: React.ReactNode};

const logger = createLogger('ChainApiContext');

function ChainApiContextProvider(props: PropTypes) {
  const {children} = props;
  const [inProgress, setInProgress] = useState(true);
  const [status, setStatus] = useState<ApiChainStatusType>('unknown');
  const [error, setError] = useState<Error | null>(null);
  const {currentNetwork} = useContext(NetworkContext);
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [sections, setSections] = useState<string[]>([]);
  const eventStreamHandlerRef = useRef<Function | null>(null);

  const shouldConnect = useRef(true);
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
    console.log('Render ChainApiContext');
    if (currentNetwork && shouldConnect) {
      try {
        setInProgress(true);
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
          shouldConnect.current = true;
          setStatus('disconnected');
        });

        apiPromise.on('ready', () => {
          logger.debug('ChainApiContext: Api ready');
          setInProgress(false);
          setError(null);

          setStatus('ready');
          setApi(apiPromise);
          shouldConnect.current = false;
        });

        apiPromise.on('error', (e: Error) => {
          setInProgress(false);
          setError(e);
        });
      } catch (e) {
        setError(e);
      }
    }
  }, [currentNetwork, shouldConnect]);

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

        const ss58Format = properties.ss58Format
          .unwrapOr(DEFAULT_SS58)
          .toNumber();
        const tokenDecimals = properties.tokenDecimals
          .unwrapOr(DEFAULT_DECIMALS)
          .toNumber();

        setSS58Format(ss58Format);
        registry.setChainProperties(
          registry.createType('ChainProperties', {
            ss58Format,
            tokenDecimals,
            tokenSymbol,
          }),
        );

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
          unit: tokenSymbol || 'UNIT',
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
    () => ({api, status, error, addSection, removeSection, inProgress}),
    [status, error, api, addSection, removeSection, inProgress],
  );

  return (
    <ChainApiContext.Provider value={value}>
      {inProgress ? (
        <LoadingView
          text={`Connecting to ${currentNetwork?.name}`}
          renderIcon={() => (
            <Icon
              style={[globalStyles.inlineIconDimension, {color: colorGreen}]}
              name="planet"
              pack="ionic"
            />
          )}
        />
      ) : (
        children
      )}
    </ChainApiContext.Provider>
  );
}

export default ChainApiContextProvider;
