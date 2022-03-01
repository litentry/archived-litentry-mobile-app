import React from 'react';
import {View, StyleSheet, SectionList, Linking} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {RouteProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import {Card, Subheading, Paragraph, List, Divider, Icon, Button, Text} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {EmptyView} from '@ui/components/EmptyView';
import {AccountInfo} from 'src/api/hooks/useParachainsOverview';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

type ScreenProps = {
  route: RouteProp<ParachainsStackParamList, 'Parachain'>;
};

export function ParachainDetailScreen({route}: ScreenProps) {
  const {id, name, lastIncludedBlock, lastBackedBlock, lease, lifecycle, homepage, nonVoters, validators} =
    route.params.parachain;

  const sections = [
    {
      title: `Val. Group (${validators?.validators?.length || 0})`,
      data: validators?.validators || [],
    },
    {
      title: `Non-Voters (${nonVoters.length || 0})`,
      data: nonVoters || [],
    },
  ];

  if (!route.params.parachain) {
    return <EmptyView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={() => (
          <Card>
            <Card.Content>
              <Subheading style={globalStyles.textCenter}>{name}</Subheading>
              <Paragraph style={globalStyles.textCenter}>{`#${id}`}</Paragraph>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <List.Item style={styles.listItem} title="Included" description={lastIncludedBlock} />
                <List.Item style={styles.listItem} title="Backed" description={`${lastBackedBlock || 0}`} />
              </View>
              <Divider />
              <List.Item
                title="Lease"
                left={() => <LeftIcon icon="clock-outline" />}
                right={() => (
                  <View style={styles.accessoryRight}>
                    {lease ? <Text>{lease?.period}</Text> : null}
                    <Text style={globalStyles.rowContainer}>
                      {lease?.blockTime
                        ? lease.blockTime.slice(0, 2).map((block: string, i: number) => <Text key={i}>{block} </Text>)
                        : null}
                    </Text>
                  </View>
                )}
              />
              <List.Item
                title="Lifecycle"
                left={() => <LeftIcon icon="sync" />}
                right={() => (
                  <View style={styles.accessoryRight}>
                    <Text>{lifecycle}</Text>
                  </View>
                )}
              />
              {homepage ? <Divider /> : null}
              <Padder scale={0.5} />
              {homepage ? (
                <Button
                  icon="home"
                  onPress={() => {
                    Linking.canOpenURL(homepage).then((supported) => {
                      if (supported) {
                        Linking.openURL(homepage);
                      }
                    });
                  }}>
                  {`Homepage`}
                </Button>
              ) : null}
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderItem={({item}) => <MemoizedValidator account={item} />}
        renderSectionHeader={({section: {title}}) => <Text style={styles.header}>{title}</Text>}
        keyExtractor={(item) => item.address.toString()}
        ListEmptyComponent={EmptyView}
        ItemSeparatorComponent={Divider}
        removeClippedSubviews={true}
      />
    </SafeView>
  );
}

function LeftIcon({icon}: {icon: string}) {
  return (
    <View style={globalStyles.justifyCenter}>
      <Icon name={icon} size={20} />
    </View>
  );
}

function Validator({account}: {account: AccountInfo}) {
  return <List.Item title={() => account && <AccountTeaser account={account.account} />} />;
}
const MemoizedValidator = React.memo(Validator);

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
