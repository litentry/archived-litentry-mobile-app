import React from 'react';
import {AccountRegistration as SubstrateChainAccountRegistration} from 'src/api/hooks/useAccount';
import {List, Icon, Text, useTheme} from '@ui/library';
import globalStyles from '@ui/styles';
import {View, Linking} from 'react-native';
import {isString} from 'lodash';

type Props = {
  registration: SubstrateChainAccountRegistration;
};

const ItemRight = (children: string | React.ReactNode) => () => {
  return (
    <View style={globalStyles.justifyCenter}>
      {isString(children) ? <Text variant="bodySmall">{children}</Text> : children}
    </View>
  );
};

const ItemLeft = (icon: string) => () =>
  (
    <View style={globalStyles.justifyCenter}>
      <Icon name={icon} size={20} />
    </View>
  );

export function AccountRegistration({registration}: Props) {
  const {legal, email, twitter, riot, web} = registration;
  const {colors} = useTheme();

  return (
    <>
      {legal ? <List.Item title="Legal" left={ItemLeft('medal-outline')} right={ItemRight(legal)} /> : null}
      {email ? <List.Item title="Email" left={ItemLeft('email-outline')} right={ItemRight(email)} /> : null}
      {twitter ? (
        <List.Item
          title="Twitter"
          left={ItemLeft('twitter')}
          right={ItemRight(
            <Text
              variant="bodySmall"
              style={{color: colors.primary}}
              onPress={() => Linking.openURL(`https://twitter.com/${twitter}`)}>
              {twitter}
            </Text>,
          )}
        />
      ) : null}
      {riot ? (
        <List.Item
          title="Riot"
          left={ItemLeft('message-outline')}
          right={ItemRight(
            <Text
              variant="bodySmall"
              style={{color: colors.primary}}
              onPress={() => Linking.openURL(`https://matrix.to/#/${riot}`)}>
              {riot}
            </Text>,
          )}
        />
      ) : null}
      {web ? (
        <List.Item
          title="Web"
          left={ItemLeft('earth')}
          right={ItemRight(
            <Text variant="bodySmall" style={{color: colors.primary}} onPress={() => Linking.openURL(web)}>
              {web}
            </Text>,
          )}
        />
      ) : null}
    </>
  );
}
