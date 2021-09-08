import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {request, gql} from 'graphql-request';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {EmptyView} from 'presentational/EmptyView';
import {Card, Text} from '@ui-kitten/components';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import Padder from 'presentational/Padder';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {useNavigation} from '@react-navigation/native';
import {tipDetailScreen} from 'src/navigation/routeKeys';
import {standardPadding} from 'src/styles';

type Tip = {
  id: string;
  who: string;
  finder: string;
  reason: string;
};

function TipsTest() {
  const navigation = useNavigation();
  const {isLoading, data: tips} = useQuery<Tip[]>('tips-test', async () => {
    const data = await request('http://localhost:4000', query);
    return data.tips;
  });

  return (
    <SafeView edges={noTopEdges}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          style={styles.container}
          data={tips}
          renderItem={({item}) => (
            <Card style={styles.card} onPress={() => navigation.navigate(tipDetailScreen, {hash: item.id})}>
              <AddressInlineTeaser address={item.who} />
              <Padder scale={0.5} />
              <StatInfoBlock title="Reason">
                <Text category="c1" style={styles.tipReasonText}>
                  {item.reason}
                </Text>
              </StatInfoBlock>
            </Card>
          )}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={EmptyView}
        />
      )}
    </SafeView>
  );
}

const query = gql`
  {
    tips {
      id
      who
      finder
      reason
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: standardPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identIconContainer: {
    marginRight: 15,
  },
  tipReasonText: {
    color: '#99a7a3',
    textAlign: 'justify',
  },
});

export default TipsTest;
