import {NavigationProp, RouteProp, useLinkTo} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import LoadingView from 'presentational/LoadingView';
import React, {useContext} from 'react';
import {AppStackParamList} from 'src/navigation/navigation';
import {deeplinkNavigatorScreen} from 'src/navigation/routeKeys';

// TODO: Remove this file and move the logic to push notification handling function
export function DeeplinkNavigatorScreen({
  route,
}: {
  navigation: NavigationProp<AppStackParamList, typeof deeplinkNavigatorScreen>;
  route: RouteProp<AppStackParamList, typeof deeplinkNavigatorScreen>;
}) {
  const linkTo = useLinkTo();
  const {currentNetwork, select, availableNetworks} = useContext(NetworkContext);
  const {api} = useContext(ChainApiContext);

  React.useEffect(() => {
    const selectedNetwork = availableNetworks.find((n) => n.key === route.params?.network) ?? currentNetwork;
    if (selectedNetwork.key !== currentNetwork.key) {
      select(selectedNetwork);
    } else if (api) {
      if (!route.params) {
        linkTo('/');
      } else if (route.params.network === currentNetwork.key) {
        linkTo(`/${route.params.redirectTo ?? ''}`);
      }
    }
  }, [api, route.params, linkTo, availableNetworks, select, currentNetwork]);

  return <LoadingView />;
}
