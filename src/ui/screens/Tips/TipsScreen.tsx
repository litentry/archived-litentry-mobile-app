import React from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {NavigationProp} from '@react-navigation/core';
import {TipTeaser} from '@ui/components/Tips/TipTeaser';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useTips} from 'src/api/hooks/useTips';
import {tipDetailScreen} from '@ui/navigation/routeKeys';
import {proposeTipScreen} from '@ui/navigation/routeKeys';
import globalStyles from '@ui/styles';
import {Button, useTheme} from '@ui/library';
import {DashboardStackParamList} from '@ui/navigation/navigation';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
};

export function TipsScreen({navigation}: ScreenProps) {
  const {data: tips, loading, refetch, refetching} = useTips(['Opened']);
  const {colors} = useTheme();

  const toTipDetails = (id: string) => {
    navigation.navigate(tipDetailScreen, {id});
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        {loading && !tips ? (
          <LoadingView />
        ) : (
          <FlatList
            ListHeaderComponent={() => {
              return (
                <View style={styles.proposeTipContainer}>
                  <Button mode="outlined" uppercase={false} onPress={() => navigation.navigate(proposeTipScreen)}>
                    Propose Tip
                  </Button>
                </View>
              );
            }}
            style={globalStyles.flex}
            data={tips}
            renderItem={({item}) => <TipTeaser tip={item} onPress={toTipDetails} />}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={EmptyView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                onRefresh={refetch}
                refreshing={refetching}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
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
