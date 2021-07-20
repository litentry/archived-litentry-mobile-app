import {TipTeaser} from 'layout/tips/TipTeaser';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTips} from 'src/api/hooks/useTips';
import globalStyles from 'src/styles';

function TipsScreen() {
  const {data: tips, isLoading} = useTips();

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            style={globalStyles.flex}
            data={tips}
            renderItem={({item}) => <TipTeaser tip={item} />}
            keyExtractor={(item) => item.toString()}
            ListEmptyComponent={EmptyView}
          />
        )}
      </View>
    </SafeView>
  );
}

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
