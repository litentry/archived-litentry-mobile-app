import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {IdentityInfo, RegistrationJudgement} from '@polkadot/types/interfaces';
import {Layout, Text, Icon, ListItem, Divider} from '@ui-kitten/components';
import {u8aToString} from '@polkadot/util';
import {standardPadding} from 'src/styles';
import {ModalContext} from 'context/ModalContextProvider';
import JudgmentStatus from './JudgmentStatus';
import {Vec} from '@polkadot/types';
import {NetworkType} from 'src/types';
import ModalTitle from './ModalTitle';

type PropTypes = {
  network: NetworkType | null;
  info: IdentityInfo;
  judgements: Vec<RegistrationJudgement>;
};

function AddressInfoBadge({info, judgements, network}: PropTypes) {
  const {display} = info;
  const {show} = useContext(ModalContext);

  const detailView = useMemo(() => {
    const displayName = u8aToString(info.display.asRaw) || 'untitled account';
    return (
      <Layout style={styles.detailContainer}>
        <Layout>
          <ModalTitle title={displayName} subtitle={` (@${network?.name})`} />
        </Layout>
        <Divider />
        <ListItem
          title="Display"
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          accessoryRight={() => (
            <Text selectable category="label">
              {displayName}
            </Text>
          )}
        />
        <ListItem
          title="Legal"
          accessoryLeft={(props) => <Icon {...props} name="award-outline" />}
          accessoryRight={() => (
            <Text selectable category="label">
              {u8aToString(info.legal.asRaw) || 'Unset'}
            </Text>
          )}
        />
        <ListItem
          title="Email"
          accessoryLeft={(props) => <Icon {...props} name="email-outline" />}
          accessoryRight={() => (
            <Text selectable category="label">
              {u8aToString(info.email.asRaw) || 'Unset'}
            </Text>
          )}
        />
        <ListItem
          title="Twitter"
          accessoryLeft={(props) => <Icon {...props} name="twitter-outline" />}
          accessoryRight={() => (
            <Text selectable category="label">
              {u8aToString(info.twitter.asRaw) || 'Unset'}
            </Text>
          )}
        />
        <ListItem
          title="Riot"
          accessoryLeft={(props) => (
            <Icon {...props} name="message-square-outline" />
          )}
          accessoryRight={() => (
            <Text selectable category="label">
              {u8aToString(info.riot.asRaw) || 'Unset'}
            </Text>
          )}
        />
        <ListItem
          title="Web"
          accessoryLeft={(props) => <Icon {...props} name="browser-outline" />}
          accessoryRight={() => (
            <Text selectable category="label">
              {u8aToString(info.web.asRaw) || 'Unset'}
            </Text>
          )}
        />
        <View style={styles.padding} />
      </Layout>
    );
  }, [info, network]);

  return (
    <>
      <TouchableOpacity onPress={() => show(detailView)}>
        <Layout style={styles.container}>
          <Text category="c2">{u8aToString(display.asRaw)}</Text>
          <Icon
            name="arrow-down"
            style={styles.icon}
            fill="#ccc"
            animation="pulse"
          />
          <Layout style={{flexDirection: 'row'}}>
            {judgements.map((judgement) => (
              <JudgmentStatus judgement={judgement} />
            ))}
          </Layout>
        </Layout>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal: {},
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
