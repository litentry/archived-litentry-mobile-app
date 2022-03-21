import React, {useState, useCallback, useEffect, useContext} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject, createHttpLink} from '@apollo/client';
import {CachePersistor, MMKVWrapper} from 'apollo3-cache-persist';
import {MMKV} from 'react-native-mmkv';
import {useNetwork} from '.';

const LITENTRY_API_URI = 'https://graph.litentry.io/graphql';

type LitentryApiContextType = {
  clearCache: () => void;
  client: ApolloClient<NormalizedCacheObject>;
};

const LitentryApiContext = React.createContext<LitentryApiContextType | undefined>(undefined);

export function LitentryApiClientProvider({children}: {children: React.ReactNode}) {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] = useState<CachePersistor<NormalizedCacheObject>>();
  const {currentNetwork} = useNetwork();

  const clearCache = useCallback(() => {
    if (persistor) {
      persistor.purge();
    }
  }, [persistor]);

  useEffect(() => {
    const init = async () => {
      // @TODO: https://github.com/litentry/litentry-app/issues/869
      // Enable cache redirects
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              substrateChainCouncil: {
                merge: true,
              },
              substrateChainAccount: {
                merge: true,
              },
            },
          },
        },
      });
      const storage = new MMKV({id: `apollo-cache-${currentNetwork.key}`});
      const cachePersistor = new CachePersistor({
        cache,
        storage: new MMKVWrapper(storage),
        debug: __DEV__,
        key: `persistor-key-${currentNetwork.key}`,
      });
      await cachePersistor.restore();

      setPersistor(cachePersistor);
      setClient(
        new ApolloClient({
          link: createHttpLink({
            uri: LITENTRY_API_URI,
            headers: {
              'substrate-network': currentNetwork.key,
            },
          }),
          cache,
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'cache-and-network',
            },
          },
        }),
      );
    };

    init();
  }, [currentNetwork.key]);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <LitentryApiContext.Provider value={{clearCache, client}}>{children}</LitentryApiContext.Provider>
    </ApolloProvider>
  );
}

export function useClearCache() {
  const context = useContext(LitentryApiContext);
  if (!context) {
    throw new Error('useClearCache must be used within LitentryApiClientProvider');
  }
  return {clearCache: context.clearCache};
}

export function useLitentryApiClient() {
  const context = useContext(LitentryApiContext);
  if (!context) {
    throw new Error('useClient must be used within LitentryApiClientProvider');
  }
  return {client: context.client};
}
