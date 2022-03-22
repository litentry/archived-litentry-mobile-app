import React from 'react';
import {AccountRegistration as SubstrateChainAccountRegistration} from 'src/api/hooks/useAccount';
import {List, Icon, Caption} from '@ui/library';
import globalStyles from '@ui/styles';
import {View} from 'react-native';

type Props = {
  registration: SubstrateChainAccountRegistration;
};

export function AccountRegistration({registration}: Props) {
  return (
    <>
      <List.Item
        title="Display"
        left={() => <LeftIcon icon="account" />}
        right={() => (
          <ItemRight>
            <Caption>{registration.display}</Caption>
          </ItemRight>
        )}
      />
      <List.Accordion title="Identity Detail">
        <List.Item
          title="Legal"
          left={() => <LeftIcon icon="medal-outline" />}
          right={() => (
            <ItemRight>
              <Caption>{registration.legal || 'Unset'}</Caption>
            </ItemRight>
          )}
        />
        <List.Item
          title="Email"
          left={() => <LeftIcon icon="email-outline" />}
          right={() => (
            <ItemRight>
              <Caption>{registration.email || 'Unset'}</Caption>
            </ItemRight>
          )}
        />
        <List.Item
          title="Twitter"
          left={() => <LeftIcon icon="twitter" />}
          right={() => (
            <ItemRight>
              <Caption>{registration.twitter || 'Unset'}</Caption>
            </ItemRight>
          )}
        />
        <List.Item
          title="Riot"
          left={() => <LeftIcon icon="message-outline" />}
          right={() => (
            <ItemRight>
              <Caption>{registration.riot || 'Unset'}</Caption>
            </ItemRight>
          )}
        />
        <List.Item
          title="Web"
          left={() => <LeftIcon icon="earth" />}
          right={() => (
            <ItemRight>
              <Caption>{registration.web || 'Unset'}</Caption>
            </ItemRight>
          )}
        />
      </List.Accordion>
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
