import React, {useCallback, useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {Registration} from '@polkadot/types/interfaces';
import {u8aToString} from '@polkadot/util';
import {
  Button,
  Divider,
  Icon,
  IconProps,
  Layout,
  ListItem,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import BN from 'bn.js';
import RegistrarSelectionModal from 'layout/RegistrarSelectionModal';
import InfoBanner from 'presentational/InfoBanner';
import Padder from 'presentational/Padder';
import {useApiTx} from 'src/api/hooks/useApiTx';
import globalStyles, {standardPadding} from 'src/styles';

type PropTypes = {
  address: string;
  display: string;
  registration?: Registration;
};

const MoreIcon = (props: IconProps) => <Icon {...props} pack="ionic" name="ios-apps-outline" />;

function RequestJudgement({display, address, registration}: PropTypes) {
  const [visible, setVisible] = useState(false);
  const startTx = useApiTx();

  const handleRequestJudgement = useCallback(
    (index: number, fee?: BN) => {
      if (fee) {
        setVisible(false);
        startTx({
          address,
          txMethod: 'identity.requestJudgement',
          params: [index, fee],
        }).catch((e) => {
          Alert.alert('account/api is not ready');
          console.error(e);
        });
      }
    },
    [startTx, address],
  );

  return (
    <Layout style={globalStyles.paddedContainer}>
      <View style={{paddingHorizontal: standardPadding * 2}}>
        <InfoBanner text="There is identify data found, however no Judgement is provided." inline />
      </View>
      <Padder scale={0.5} />
      <Divider />
      <Layout>
        <ListItem
          title="Address"
          accessoryLeft={() => (
            <View style={styles.identiconContainer}>
              <Identicon value={address} size={20} />
            </View>
          )}
          accessoryRight={() => (
            <Text
              selectable
              category="label"
              numberOfLines={1}
              style={styles.accesoryRightLabel}
              ellipsizeMode="middle">
              {address}
            </Text>
          )}
        />
        <ListItem
          title="Display"
          accessoryLeft={(iconProps: IconProps) => <Icon {...iconProps} name="person-outline" />}
          accessoryRight={() => (
            <Text
              selectable
              category="label"
              numberOfLines={1}
              style={styles.accesoryRightLabel}
              ellipsizeMode="middle">
              {display || 'untitled account'}
            </Text>
          )}
        />

        <Menu style={styles.menu}>
          <MenuGroup title=" Identity detail" accessoryLeft={MoreIcon}>
            <MenuItem
              title="Legal"
              accessoryLeft={(props) => <Icon {...props} name="award-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(registration?.info.legal.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Email"
              accessoryLeft={(props) => <Icon {...props} name="email-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(registration?.info.email.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Twitter"
              accessoryLeft={(props) => <Icon {...props} name="twitter-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(registration?.info.twitter.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Riot"
              accessoryLeft={(props) => <Icon {...props} name="message-square-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(registration?.info.riot.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Web"
              accessoryLeft={(props) => <Icon {...props} name="browser-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(registration?.info.web.asRaw) || 'Unset'}
                </Text>
              )}
            />
          </MenuGroup>
        </Menu>
        <Padder scale={1} />
        <Button onPress={() => setVisible(true)}>Request Judgement</Button>
        <RegistrarSelectionModal
          onClose={() => setVisible(false)}
          onSelect={handleRequestJudgement}
          visible={visible}
        />
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  identiconContainer: {paddingHorizontal: 10},
  accesoryRightLabel: {width: '50%', textAlign: 'right'},
  menu: {backgroundColor: 'transparent'},
});

export default RequestJudgement;
