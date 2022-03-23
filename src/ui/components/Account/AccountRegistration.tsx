import React from 'react';
import {AccountRegistration as SubstrateChainAccountRegistration} from 'src/api/hooks/useAccount';
import {List, Icon, Caption, useTheme} from '@ui/library';
import globalStyles from '@ui/styles';
import {Linking, StyleSheet, View} from 'react-native';

type Props = {
  registration: SubstrateChainAccountRegistration;
};

export function AccountRegistration({registration}: Props) {
  const {legal, email, twitter, riot, web} = registration;
  const {colors} = useTheme();
  return (
    <>
      {legal ? (
        <List.Item
          title="Legal"
          left={() => <LeftIcon icon="medal-outline" />}
          right={() => (
            <ItemRight>
              <Caption>{legal}</Caption>
            </ItemRight>
          )}
        />
      ) : null}
      {email ? (
        <List.Item
          title="Email"
          left={() => <LeftIcon icon="email-outline" />}
          right={() => (
            <ItemRight>
              <Caption selectable>{email}</Caption>
            </ItemRight>
          )}
        />
      ) : null}
      {twitter ? (
        <List.Item
          title="Twitter"
          left={() => <LeftIcon icon="twitter" />}
          right={() => (
            <ItemRight>
              <Caption
                style={{color: colors.primary}}
                onPress={() => Linking.openURL(`https://twitter.com/${twitter}`)}>
                {twitter}
              </Caption>
            </ItemRight>
          )}
        />
      ) : null}
      {riot ? (
        <List.Item
          title="Riot"
          left={() => <LeftIcon icon="message-outline" />}
          right={() => (
            <ItemRight>
              <Caption style={{color: colors.primary}} onPress={() => Linking.openURL(`https://matrix.to/#/${riot}`)}>
                {riot}
              </Caption>
            </ItemRight>
          )}
        />
      ) : null}
      {web ? (
        <List.Item
          title="Web"
          left={() => <LeftIcon icon="earth" />}
          right={() => (
            <ItemRight>
              <Caption style={styles.web} onPress={() => Linking.openURL(web)}>
                {web}
              </Caption>
            </ItemRight>
          )}
        />
      ) : null}
    </>
  );
}

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}

function LeftIcon({icon}: {icon: string}) {
  return (
    <View style={globalStyles.justifyCenter}>
      <Icon name={icon} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  web: {
    textDecorationLine: 'underline',
  },
});
