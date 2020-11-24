import React, {
  createContext,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import {StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Layout, Button, Divider} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {NetworkContext} from './NetworkContext';
import NetworkSelectionList from 'presentational/NetworkSelectionList';
import {NetworkType} from 'src/types';

type NetworkSelectionContextValueType = {
  selectNetwork: () => void;
  currentNetwork: NetworkType | undefined;
};

export const NetworkSelectionContext = createContext<NetworkSelectionContextValueType>(
  {selectNetwork: () => undefined, currentNetwork: undefined},
);

type PropTypes = {
  children: React.ReactNode;
};

function NetworkSelectionContextProvider({children}: PropTypes) {
  const modalRef = useRef<Modalize>(null);
  const {currentNetwork, availableNetworks, select} = useContext(
    NetworkContext,
  );
  const selectNetwork = useCallback(() => {
    modalRef.current?.open();
  }, []);
  const value = useMemo(() => ({selectNetwork, currentNetwork}), [
    selectNetwork,
    currentNetwork,
  ]);

  return (
    <NetworkSelectionContext.Provider value={value}>
      <>
        {children}
        {currentNetwork && (
          <Modalize
            ref={modalRef}
            threshold={250}
            scrollViewProps={{showsVerticalScrollIndicator: false}}
            adjustToContentHeight
            handlePosition="outside"
            closeOnOverlayTap
            panGestureEnabled>
            <Layout level="1" style={styles.networkModal}>
              <NetworkSelectionList
                items={availableNetworks}
                selected={currentNetwork}
                onSelect={select}
              />
              <Divider style={globalStyles.divider} />
              <Button
                appearance="ghost"
                onPress={() => modalRef.current?.close()}>
                Close
              </Button>
            </Layout>
          </Modalize>
        )}
      </>
    </NetworkSelectionContext.Provider>
  );
}

const styles = StyleSheet.create({
  networkModal: {
    paddingVertical: standardPadding * 3,
    paddingHorizontal: standardPadding * 2,
  },
});

export default NetworkSelectionContextProvider;
