import React from 'react';
import {View} from 'react-native';
import {
  Text,
  Layout,
  Divider,
  ListItem,
  Button,
  IconProps,
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import InfoBanner from 'presentational/InfoBanner';
import Padder from 'presentational/Padder';
import Identicon from '@polkadot/reactnative-identicon';
import {u8aToString} from '@polkadot/util';
import {AddressDetailType} from 'src/types';

type PropTypes = {
  address: string;
  display: string;
  detail?: AddressDetailType;
};

const MoreIcon = (props: IconProps) => (
  <Icon {...props} pack="ionic" name="ios-apps-outline" />
);

function RequestJudgement({display, address, detail}: PropTypes) {
  return (
    <Layout style={globalStyles.paddedContainer}>
      <View style={{paddingHorizontal: standardPadding * 2}}>
        <InfoBanner
          text="There is identify data found, however no Judgement is provided."
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
        <ListItem
          title="Display"
          accessoryLeft={(iconProps: IconProps) => (
            <Icon {...iconProps} name="person-outline" />
          )}
          accessoryRight={() => (
            <Text
              selectable
              category="label"
              numberOfLines={1}
              style={{width: '50%', textAlign: 'right'}}
              ellipsizeMode="middle">
              {display || 'untitled account'}
            </Text>
          )}
        />

        <Menu style={{backgroundColor: 'transparent'}}>
          <MenuGroup title=" Identity detail" accessoryLeft={MoreIcon}>
            <MenuItem
              title="Legal"
              accessoryLeft={(props) => (
                <Icon {...props} name="award-outline" />
              )}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(detail?.data?.info.legal.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Email"
              accessoryLeft={(props) => (
                <Icon {...props} name="email-outline" />
              )}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(detail?.data?.info.email.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Twitter"
              accessoryLeft={(props) => (
                <Icon {...props} name="twitter-outline" />
              )}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(detail?.data?.info.twitter.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Riot"
              accessoryLeft={(props) => (
                <Icon {...props} name="message-square-outline" />
              )}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(detail?.data?.info.riot.asRaw) || 'Unset'}
                </Text>
              )}
            />
            <MenuItem
              title="Web"
              accessoryLeft={(props) => (
                <Icon {...props} name="browser-outline" />
              )}
              accessoryRight={() => (
                <Text selectable category="label">
                  {u8aToString(detail?.data?.info.web.asRaw) || 'Unset'}
                </Text>
              )}
            />
          </MenuGroup>
        </Menu>
        <Padder scale={1} />
        <Button onPress={() => null}>Request Judgement</Button>
      </Layout>
    </Layout>
  );
}

export default RequestJudgement;
