import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Button} from '@ui-kitten/components';
import {MemoizedTipTeaser} from '@ui/components/tips/TipTeaser';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useTips} from 'src/api/hooks/useTips';
import {tipDetailScreen} from '@ui/navigation/routeKeys';
import {proposeTipScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';

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
            ListHeaderComponent={() => {
              return (
                <View style={styles.proposeTipContainer}>
                  <Button onPress={() => navigation.navigate(proposeTipScreen)} appearance="outline">
                    Propose Tip
                  </Button>
                </View>
              );
            }}
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
  proposeTipContainer: {
    paddingVertical: 20,
  },
});
