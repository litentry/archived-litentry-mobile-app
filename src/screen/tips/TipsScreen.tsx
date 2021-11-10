import {useNavigation} from '@react-navigation/core';
import {MemoizedTipTeaser} from 'layout/tips/TipTeaser';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTips} from 'src/api/hooks/useTips';
import {tipDetailScreen} from 'src/navigation/routeKeys';
import globalStyles from 'src/styles';

function TipsScreen() {
  const {data: tips, isLoading} = useTips();
  const navigation = useNavigation();

  const toTipDetails = (hash: string) => {
    navigation.navigate(tipDetailScreen, {hash});
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            style={globalStyles.flex}
            data={tips}
            renderItem={({item}) => <MemoizedTipTeaser tip={item} onPress={toTipDetails} />}
            keyExtractor={(item) => item.toString()}
            ListEmptyComponent={EmptyView}
            showsVerticalScrollIndicator={false}
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
