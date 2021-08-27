import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import Identicon from '@polkadot/reactnative-identicon';

import ModalTitle from 'presentational/ModalTitle';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {registerSubIdentitiesScreen} from 'src/navigation/routeKeys';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {Button, Card, IconProps, Layout, ListItem, Text, TopNavigationAction} from '@ui-kitten/components';
import globalStyles, {monofontFamily} from 'src/styles';
import Icon from 'presentational/Icon';
import {useSubIdentities, SubIdentity} from 'src/api/hooks/useSubIdentities';
import {AddSubIdentity} from './AddSubIdentity';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, typeof registerSubIdentitiesScreen>;
};

export function RegisterSubIdentitiesScreen({route, navigation}: ScreenProps) {
  const address = route.params.address;
  const modalRef = useRef<Modalize>(null);
  const {data: identityInfo} = useAccountIdentityInfo(address);
  const {data: subIdentities} = useSubIdentities(address);
  const [infos, setInfos] = useState(subIdentities || []);
  const [submitSubsDisabled, setSubmitSubsDisabled] = useState(true);

  useEffect(() => {
    if (subIdentities) {
      setInfos(subIdentities);
    }
  }, [subIdentities, setInfos]);

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

  const onSetSubIdentitiesPress = () => {
    // TODO: make tx here (with await)
    setSubmitSubsDisabled(true);
  };

  const onAddPress = (subIdentity: SubIdentity) => {
    setInfos((prevInfos) => [...prevInfos, subIdentity]);
    setSubmitSubsDisabled(false);
    modalRef.current?.close();
  };

  const onRemovePress = (accountId: string) => {
    setInfos((prevInfos) => {
      return prevInfos.filter((info) => info.accountId !== accountId);
    });
    setSubmitSubsDisabled(false);
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <Button style={styles.setSubIdentitiesButton} onPress={onSetSubIdentitiesPress} disabled={submitSubsDisabled}>
          Set Sub-identities
        </Button>
        <FlatList
          ListHeaderComponent={() => (
            <Text category="s1" style={styles.subIdentitiesListHeader}>
              {`Sub-identities (${infos?.length || 0})`}
            </Text>
          )}
          data={infos}
          keyExtractor={(item) => item.accountId}
          renderItem={({item}) => (
            <ListItem
              disabled={true}
              title={`${identityInfo?.display}/${item.name}`.toUpperCase()}
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
          <AddSubIdentity onAddPress={onAddPress} />
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
  setSubIdentitiesButton: {marginBottom: 20, marginHorizontal: 30},
  subIdentitiesListHeader: {paddingBottom: 10, marginTop: 10},
});
