import {u8aToString} from '@polkadot/util';
import {Button, Divider, Icon, Layout, ListItem, Text} from '@ui-kitten/components';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import globalStyles, {standardPadding} from 'src/styles';
import {NetworkType} from 'src/types';
import JudgmentStatus from './JudgmentStatus';
import ModalTitle from './ModalTitle';

type PropTypes = {
  network: NetworkType | undefined;
  address: string;
};

function AddressInfoBadge({address, network}: PropTypes) {
  const {data} = useAccountIdentityInfo(address);
  const modalRef = useRef<Modalize>(null);
  const onOpen = useCallback(() => {
    modalRef.current?.open();
  }, []);

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <View style={styles.container}>
          <Text category="c2" selectable numberOfLines={1} style={styles.display} ellipsizeMode="middle">
            {data?.display}
          </Text>
          <Icon name="arrow-down" style={styles.icon} fill="#ccc" animation="pulse" />
          <View style={globalStyles.rowContainer}>
            {data?.registration?.judgements.map((judgement) => (
              <JudgmentStatus key={String(judgement[0])} judgement={judgement} />
            ))}
          </View>
        </View>
      </TouchableOpacity>
      <Portal>
        <Modalize
          ref={modalRef}
          threshold={250}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          handlePosition="outside"
          adjustToContentHeight
          closeOnOverlayTap
          panGestureEnabled>
          <Layout style={styles.detailContainer}>
            <Layout>
              <ModalTitle title={data?.display ?? ''} subtitle={` (@${network?.name})`} />
            </Layout>
            <Divider />
            <ListItem
              title="Display"
              accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
              accessoryRight={() => (
                <Text style={{maxWidth: '55%'}} selectable category="label" numberOfLines={1} ellipsizeMode="middle">
                  {data?.display}
                </Text>
              )}
            />
            <ListItem
              title="Legal"
              accessoryLeft={(props) => <Icon {...props} name="award-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(data?.info?.legal.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <ListItem
              title="Email"
              accessoryLeft={(props) => <Icon {...props} name="email-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(data?.info?.email.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <ListItem
              title="Twitter"
              accessoryLeft={(props) => <Icon {...props} name="twitter-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(data?.info?.twitter.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <ListItem
              title="Riot"
              accessoryLeft={(props) => <Icon {...props} name="message-square-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(data?.info?.riot.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <ListItem
              title="Web"
              accessoryLeft={(props) => <Icon {...props} name="browser-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(data?.info?.web.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <Divider style={globalStyles.divider} />
            <Button appearance="ghost" onPress={() => modalRef.current?.close()}>
              Close
            </Button>
          </Layout>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  display: {
    flex: 1,
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: standardPadding / 2,
  },
  detailContainer: {padding: standardPadding * 2},
  title: {
    alignSelf: 'center',
    paddingBottom: standardPadding * 3,
  },
  padding: {
    paddingVertical: 40,
  },
});

export default AddressInfoBadge;
