import {RouteProp} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {usePolkaassemblyDiscussionDetail} from 'src/api/hooks/usePolkaassemblyDiscussionDetail';
import {PolkaassemblyDiscussionStackParamList} from 'src/navigation/navigation';
import {standardPadding} from 'src/styles';

export function PolkaassemblyDiscussionDetail({
  route,
}: {
  route: RouteProp<PolkaassemblyDiscussionStackParamList, 'PolkaassemblyDiscussionDetail'>;
}) {
  const id = route.params.id;
  const {data} = usePolkaassemblyDiscussionDetail(id);

  if (!data) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <Text category="h6">{data.title ?? ''}</Text>
        <View style={styles.postDetailRow}>
          <Text category="c2">{data.author?.username ?? ''}</Text>
          <Text category="c1">posted in</Text>
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
  postDetailRow: {
    marginTop: standardPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
