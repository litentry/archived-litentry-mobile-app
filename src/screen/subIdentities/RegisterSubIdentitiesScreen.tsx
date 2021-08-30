import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useQueryClient} from 'react-query';
import Identicon from '@polkadot/reactnative-identicon';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Button, Card, Divider, IconProps, Layout, ListItem, Text, TopNavigationAction} from '@ui-kitten/components';
import Icon from 'presentational/Icon';
import ModalTitle from 'presentational/ModalTitle';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {SubIdentity, useSubIdentities} from 'src/api/hooks/useSubIdentities';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {registerSubIdentitiesScreen} from 'src/navigation/routeKeys';
import globalStyles, {monofontFamily} from 'src/styles';
import {AddSubIdentity} from './AddSubIdentity';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, typeof registerSubIdentitiesScreen>;
};

export function RegisterSubIdentitiesScreen({route, navigation}: ScreenProps) {
  const address = route.params.address;
  const modalRef = useRef<Modalize>(null);
  const {data: identityInfo} = useAccountIdentityInfo(address);
  const {data: subIdentitiesData} = useSubIdentities(address);
  const [subIdentities, setSubIdentities] = useState(subIdentitiesData || []);
  const [submitSubsDisabled, setSubmitSubsDisabled] = useState(true);
  const queryClient = useQueryClient();
  const startTx = useApiTx();

  useEffect(() => {
    if (subIdentitiesData?.length) {
      setSubIdentities(subIdentitiesData);
    }
  }, [subIdentitiesData, setSubIdentities]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TopNavigationAction
          icon={(props) => <Icon {...props} name="plus-circle-outline" />}
          onPress={onAddSubIdentityPress}
        />
      ),
    });
  });

  const onAddSubIdentityPress = () => {
    modalRef.current?.open();
  };

  const onSetSubIdentitiesPress = async () => {
    startTx({
      address,
      txMethod: 'identity.setSubs',
      params: [subIdentities.map((sub) => [sub.accountId, {raw: sub.name}])],
    })
      .then(() => {
        queryClient.invalidateQueries(['sub-identities', address]);
        setSubmitSubsDisabled(true);
      })
      .catch((e: Error) => {
        console.warn(e);
      });
  };

  const onAddPress = (subIdentity: SubIdentity) => {
    setSubIdentities((prevInfos) => [...prevInfos, subIdentity]);
    setSubmitSubsDisabled(false);
    modalRef.current?.close();
  };

  const onRemovePress = (accountId: string) => {
    Alert.alert(
      'Remove sub-identity',
      `Do you want to remove account: \n ${accountId} ?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            setSubIdentities((prevInfos) => {
              return prevInfos.filter((info) => info.accountId !== accountId);
            });
            setSubmitSubsDisabled(false);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <Button style={styles.setSubIdentitiesButton} onPress={onSetSubIdentitiesPress} disabled={submitSubsDisabled}>
          Set Sub-identities
        </Button>
        <View style={styles.hintTextContainer}>
          <Text category="c2" appearance="hint">
            Set sub-identities after adding/removing your accounts.
          </Text>
        </View>
        <Divider />
        <FlatList
          ListHeaderComponent={() => (
            <Text category="s1" style={styles.subIdentitiesListHeader}>
              {`Sub-identities (${subIdentities?.length || 0})`}
            </Text>
          )}
          data={subIdentities}
          keyExtractor={(item) => item.accountId}
          renderItem={({item}) => (
            <ListItem
              disabled={true}
              title={`${identityInfo?.display}/${item.name || identityInfo?.display}`.toUpperCase()}
              description={item.accountId}
              accessoryLeft={() => <Identicon value={item.accountId} size={30} />}
              accessoryRight={() => (
                <Button
                  onPress={() => onRemovePress(item.accountId)}
                  accessoryLeft={RemoveIcon}
                  status="danger"
                  appearance="ghost"
                />
              )}
            />
          )}
          ListEmptyComponent={EmptySubIdentities}
        />
      </View>
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
        <Layout level="1" style={globalStyles.paddedContainer}>
          <ModalTitle title="Add sub-identity" />
          <AddSubIdentity onAddPress={onAddPress} subIdentities={subIdentities} />
        </Layout>
      </Modalize>
    </SafeView>
  );
}

function EmptySubIdentities() {
  return (
    <Card style={styles.emptySubIdentitiesContainer} disabled>
      <Text category="c2" style={styles.emptySubIdentitiesText}>
        No sub-identities set.
      </Text>
    </Card>
  );
}

const RemoveIcon = (props: IconProps) => <Icon {...props} name="trash-2-outline" />;

const styles = StyleSheet.create({
  emptySubIdentitiesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 10,
  },
  emptySubIdentitiesText: {
    fontFamily: monofontFamily,
  },
  setSubIdentitiesButton: {marginBottom: 10, marginHorizontal: 30},
  subIdentitiesListHeader: {paddingBottom: 10, marginTop: 10},
  hintTextContainer: {alignItems: 'center', marginBottom: 20},
});
