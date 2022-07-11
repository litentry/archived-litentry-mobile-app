import React from 'react';
import {AccountRegistration as SubstrateChainAccountRegistration} from 'src/api/hooks/useAccount';
import {List, Icon, Caption, useTheme} from '@ui/library';
import globalStyles from '@ui/styles';
import {View, Linking} from 'react-native';
import {isString} from 'lodash';

type Props = {
  registration: SubstrateChainAccountRegistration;
};

const ItemRight = (children: string | React.ReactNode) => () => {
  return (
    <View style={globalStyles.justifyCenter}>{isString(children) ? <Caption>{children}</Caption> : children}</View>
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
            <Caption style={{color: colors.primary}} onPress={() => Linking.openURL(`https://twitter.com/${twitter}`)}>
              {twitter}
            </Caption>,
          )}
        />
      ) : null}
      {riot ? (
        <List.Item
          title="Riot"
          left={ItemLeft('message-outline')}
          right={ItemRight(
            <Caption style={{color: colors.primary}} onPress={() => Linking.openURL(`https://matrix.to/#/${riot}`)}>
              {riot}
            </Caption>,
          )}
        />
      ) : null}
      {web ? (
        <List.Item
          title="Web"
          left={ItemLeft('earth')}
          right={ItemRight(
            <Caption style={{color: colors.primary}} onPress={() => Linking.openURL(web)}>
              {web}
            </Caption>,
          )}
        />
      ) : null}
    </>
  );
}
