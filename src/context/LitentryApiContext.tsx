import React, {useState, useEffect, useContext} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject, createHttpLink} from '@apollo/client';
import {useNetwork} from '@atoms/network';

const LITENTRY_API_URI = 'https://graph.litentry.io/graphql';

type LitentryApiContextType = {
  client: ApolloClient<NormalizedCacheObject>;
};

const LitentryApiContext = React.createContext<LitentryApiContextType | undefined>(undefined);

/* eslint-disable @typescript-eslint/no-explicit-any */
const mergeFunc = (existing: any, incoming: any, {args}: any) => {
  const offset = args ? args.offset : 0;
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; ++i) {
    merged[offset + i] = incoming[i];
  }
  return merged;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function LitentryApiClientProvider({children}: {children: React.ReactNode}) {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const {currentNetwork} = useNetwork();

  useEffect(() => {
    const init = async () => {
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
              substrateChainTips: {
                keyArgs: [],
                merge: mergeFunc,
              },
              substrateChainDemocracyReferendums: {
                keyArgs: [],
                merge: mergeFunc,
              },
              substrateChainDemocracyProposals: {
                keyArgs: [],
                merge: mergeFunc,
              },
            },
          },
        },
      });

      const apolloInstance = new ApolloClient({
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
      });
      setClient(apolloInstance);
      if (__DEV__) {
        apolloClient = apolloInstance;
      }
    };

    init();
  }, [currentNetwork.key]);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <LitentryApiContext.Provider value={{client}}>{children}</LitentryApiContext.Provider>
    </ApolloProvider>
  );
}

export function useLitentryApiClient() {
  const context = useContext(LitentryApiContext);
  if (!context) {
    throw new Error('useClient must be used within LitentryApiClientProvider');
  }
  return {client: context.client};
}

export function ApolloClientInstance() {
  const {currentNetwork} = useNetwork();

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
          substrateChainTips: {
            keyArgs: [],
            merge: mergeFunc,
          },
          substrateChainDemocracyReferendums: {
            keyArgs: [],
            merge: mergeFunc,
          },
          substrateChainDemocracyProposals: {
            keyArgs: [],
            merge: mergeFunc,
          },
        },
      },
    },
  });
  const client = new ApolloClient({
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
  });

  return client;
}
