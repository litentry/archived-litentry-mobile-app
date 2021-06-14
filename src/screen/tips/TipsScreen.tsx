import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, FlatList, View} from 'react-native';
import {Divider, Icon, TopNavigationAction} from '@ui-kitten/components';
import {RouteProp} from '@react-navigation/native';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {useTips} from 'src/hook/useTips';
import TipTeaser from 'layout/tips/TipTeaser';
import {EmptyView} from 'presentational/EmptyView';
import globalStyles from 'src/styles';
import LoadingView from 'presentational/LoadingView';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'TipDetail'>;
};

function TipsScreen({navigation}: ScreenProps) {
  const {value: tips, loading} = useTips();

  return (
    <GenericNavigationLayout
      title="Tips"
      onBackPressed={() => navigation.goBack()}
      rightActions={() => (
        <TopNavigationAction
          icon={(props) => <Icon {...props} name="plus-circle-outline" />}
          onPress={() => navigation.navigate('SubmitTipScreen')}
        />
      )}>
      <View style={styles.container}>
        {loading ? (
          <LoadingView />
        ) : (
          <FlatList
            style={globalStyles.flex}
            data={tips}
            ItemSeparatorComponent={Divider}
            renderItem={({item}) => <TipTeaser tip={item} />}
            keyExtractor={(item) => item.toString()}
            ListEmptyComponent={EmptyView}
          />
        )}
      </View>
    </GenericNavigationLayout>
  );
}

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
