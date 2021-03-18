import React, {useRef, useCallback, useContext} from 'react';
import {StyleSheet, Dimensions, View, Alert} from 'react-native';
import {Layout, Button, Divider, ListItem, Text} from '@ui-kitten/components';
import Identicon from '@polkadot/reactnative-identicon';
import {Modalize} from 'react-native-modalize';
import InfoBanner from 'presentational/InfoBanner';
import globalStyles, {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import IdentityInfoForm from 'presentational/IdentityInfoForm';
import {ChainApiContext} from 'context/ChainApiContext';
import {TxContext} from 'context/TxContext';

const {height} = Dimensions.get('window');

type PropTypes = {address: string};

function SetInfo({address}: PropTypes) {
  const modalRef = useRef<Modalize>(null);

  const handleOpenForm = useCallback(() => {
    modalRef.current?.open();
  }, []);

  const {api} = useContext(ChainApiContext);
  const {start} = useContext(TxContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startTx = useCallback(
    async (info) => {
      if (api) {
        modalRef.current?.close();
        await start(api, address, 'identity.setIdentity', [info]);
      } else {
        Alert.alert('account/api is not ready');
      }
    },
    [address, api, start],
  );

  const handleIdentitySubmit = useCallback(
    (info) => {
      startTx(info);
    },
    [startTx],
  );

  return (
    <>
      <Layout style={globalStyles.paddedContainer}>
        <View style={{paddingHorizontal: standardPadding * 2}}>
          <InfoBanner
            text="This address doesn't have any identity connected to it."
            inline
          />
        </View>
        <Padder scale={0.5} />
        <Divider />
        <Layout>
          <ListItem
            title="Address"
            accessoryLeft={() => (
              <View style={{paddingHorizontal: 10}}>
                <Identicon value={address} size={20} />
              </View>
            )}
            accessoryRight={() => (
              <Text
                selectable
                category="label"
                numberOfLines={1}
                style={{width: '50%', textAlign: 'right'}}
                ellipsizeMode="middle">
                {address}
              </Text>
            )}
          />

          <Padder scale={1} />
          <Button onPress={handleOpenForm}>Set Identity</Button>
        </Layout>
      </Layout>

      <Modalize
        ref={modalRef}
        threshold={250}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        adjustToContentHeight
        handlePosition="outside"
        closeOnOverlayTap
        withReactModal
        useNativeDriver
        panGestureEnabled>
        <View style={{height: height * 0.8}}>
          <IdentityInfoForm onSubmit={handleIdentitySubmit} />
        </View>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({});

export default SetInfo;
