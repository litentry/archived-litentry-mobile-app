import React from 'react';
import {View, StyleSheet, SectionList, Linking} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppStackParamList, ParachainsStackParamList} from '@ui/navigation/navigation';
import {Card, Subheading, Paragraph, List, Divider, Icon, Button, Text} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {EmptyView} from '@ui/components/EmptyView';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import LoadingView from '@ui/components/LoadingView';
import {Parachain, useParaChain} from 'src/api/hooks/useParachain';
import {accountScreen} from '@ui/navigation/routeKeys';

type ScreenProps = {
  route: RouteProp<ParachainsStackParamList, 'Parachain'>;
  navigation: NavigationProp<AppStackParamList>;
};

const LeftIcon = (icon: string) => () =>
  (
    <View style={globalStyles.justifyCenter}>
      <Icon name={icon} size={20} />
    </View>
  );

function ParachainDetailsHeader({parachain}: {parachain: Parachain}) {
  const LeaseInfo = React.useCallback(() => {
    const [days, hours] = parachain?.lease?.blockTime || [];
    return (
      <View style={styles.accessoryRight}>
        {parachain.lease ? <Text>{parachain.lease?.period}</Text> : null}
        <Text style={globalStyles.rowContainer}>{days || hours ? `${days || ''} ${hours || ''}` : null}</Text>
      </View>
    );
  }, [parachain]);

  const LifecycleInfo = React.useCallback(
    () => (
      <View style={styles.accessoryRight}>
        <Text>{parachain.lifecycle}</Text>
      </View>
    ),
    [parachain],
  );

  return (
    <Card>
      <Card.Content>
        <Subheading style={globalStyles.textCenter}>{parachain.name}</Subheading>
        <Paragraph style={globalStyles.textCenter}>{`#${parachain.id}`}</Paragraph>
        <View style={globalStyles.spaceBetweenRowContainer}>
          <List.Item style={styles.listItem} title="Included" description={parachain.lastIncludedBlock} />
          <List.Item style={styles.listItem} title="Backed" description={`${parachain.lastBackedBlock || 0}`} />
        </View>
        <Divider />
        <List.Item title="Lease" left={LeftIcon('clock-outline')} right={LeaseInfo} />
        <List.Item title="Lifecycle" left={LeftIcon('sync')} right={LifecycleInfo} />
        {parachain.homepage ? <Divider /> : null}
        <Padder scale={0.5} />
        {parachain?.homepage ? (
          <Button
            icon="home"
            onPress={() => {
              Linking.canOpenURL(String(parachain.homepage)).then((supported) => {
                if (supported) {
                  Linking.openURL(String(parachain.homepage));
                }
              });
            }}>
            {`Homepage`}
          </Button>
        ) : null}
      </Card.Content>
    </Card>
  );
}

export function ParachainDetailScreen({route, navigation}: ScreenProps) {
  const {data: parachain, loading} = useParaChain(route.params.parachainId);

  const sections = [
    {
      title: `Val. Group (${parachain?.validators?.validators.length || 0})`,
      data: parachain?.validators?.validators || [],
    },
    {
      title: `Non-Voters (${parachain?.nonVoters.length || 0})`,
      data: parachain?.nonVoters || [],
    },
  ];

  const toAccountDetails = (address: string) => {
    navigation.navigate(accountScreen, {address});
  };

  if (loading && !parachain) return <LoadingView />;

  if (!parachain) return <EmptyView />;

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={<ParachainDetailsHeader parachain={parachain} />}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderItem={({item}) => (
          <View style={globalStyles.marginVertical}>
            <AccountTeaser account={item} onPress={() => toAccountDetails(item.address)} />
          </View>
        )}
        renderSectionHeader={({section: {title}}) => <Text style={styles.header}>{title}</Text>}
        keyExtractor={(item) => item.address}
        ListEmptyComponent={EmptyView}
        ItemSeparatorComponent={Divider}
        removeClippedSubviews={true}
      />
    </SafeView>
  );
}

// function LeftIcon({icon}: {icon: string}) {
//   return (
//     <View style={globalStyles.justifyCenter}>
//       <Icon name={icon} size={20} />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  listItem: {
    width: '75%',
  },
  header: {
    marginTop: standardPadding * 3,
    marginLeft: standardPadding,
  },
  accessoryRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
