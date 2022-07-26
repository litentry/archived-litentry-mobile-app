import React from 'react';
import {useWindowDimensions, View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDemocracyReferendums, DemocracyReferendum} from 'src/api/hooks/useDemocracyReferendums';
import {Padder} from '@ui/components/Padder';
import {ActivityIndicator, useTheme, Card, List, Caption, Paragraph} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import LoadingView from '@ui/components/LoadingView';
import {EmptyView} from '@ui/components/EmptyView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {ProgressBar} from '@ui/components/ProgressBar';

const Tab = createMaterialTopTabNavigator();

export function DemocracyScreen() {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialLayout={{width}}
      screenOptions={{
        tabBarLabelStyle: {color: colors.text},
        tabBarItemStyle: {width: 200},
        tabBarStyle: {backgroundColor: colors.background},
      }}>
      <Tab.Screen name="Referendums" component={Referendums} />
      <Tab.Screen name="Proposals" component={Proposals} />
    </Tab.Navigator>
  );
}

function ReferendumTeaser({referendum}: {referendum: DemocracyReferendum}) {
  const ItemLeft = React.useCallback(() => {
    const referendumIndex = referendum.id.split(':')[1] as string;
    return (
      <View style={globalStyles.justifyCenter}>
        <Paragraph>{`${referendumIndex}:`}</Paragraph>
      </View>
    );
  }, [referendum.id]);
  return (
    <Card style={{padding: standardPadding}}>
      <List.Item left={ItemLeft} title={<Paragraph>{referendum.title}</Paragraph>} />
      <View style={{marginLeft: standardPadding, marginRight: standardPadding * 3}}>
        <Row label={'Aye'}>
          <Caption>{referendum.formattedAye}</Caption>
        </Row>
        <Row label={'Nay'}>
          <Caption>{referendum.formattedNay}</Caption>
        </Row>
        <Row label={'Support'}>
          <ProgressBar percentage={referendum.ayePercent} />
        </Row>
      </View>
    </Card>
  );
}

function Referendums() {
  const {colors} = useTheme();
  const {data: referendums, loading, fetchMore, fetchingMore, refetch, refetching} = useDemocracyReferendums();

  const ListFooter = React.useCallback(() => {
    if (fetchingMore) {
      return (
        <>
          <Padder />
          <ActivityIndicator />
        </>
      );
    }

    return null;
  }, [fetchingMore]);

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.flex}>
        {loading && !referendums ? (
          <LoadingView />
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={referendums}
            renderItem={({item}) => <ReferendumTeaser referendum={item} />}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={EmptyView}
            ItemSeparatorComponent={Padder}
            refreshControl={
              <RefreshControl
                onRefresh={refetch}
                refreshing={refetching}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            onEndReached={() => {
              fetchMore({
                variables: {
                  offset: referendums?.length,
                },
              });
            }}
            ListFooterComponent={ListFooter}
          />
        )}
      </View>
    </SafeView>
  );
}

function Proposals() {
  return (
    <View>
      <Text>Proposals</Text>
    </View>
  );
}

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Caption style={styles.rowLabel}>{label}:</Caption>
      <View style={styles.value}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: standardPadding * 2,
  },
  box: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: standardPadding,
  },
  rowLabel: {
    width: '25%',
  },
  value: {
    flex: 1,
  },
});
