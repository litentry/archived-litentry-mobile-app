import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useParathreads} from 'src/api/hooks/useParaThreads';
import {List, Text, Divider, Subheading} from '@ui/library';
import {Identicon} from '@ui/components/Identicon';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import type {Parathread} from 'src/api/hooks/useParaThreads';
import {Account} from '@ui/components/Account/Account';
import {FlashList} from '@shopify/flash-list';

const toParathreadHomepage = (url: string) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

export function ParathreadsScreen() {
  const {data: parathreads, loading} = useParathreads();

  if (loading && !parathreads) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      {parathreads ? (
        <FlashList
          ListHeaderComponent={<List.Item title={<Subheading>{`Parathreads: ${parathreads.length}`}</Subheading>} />}
          style={globalStyles.flex}
          contentContainerStyle={styles.content}
          keyExtractor={(item) => item.id.toString()}
          data={parathreads}
          renderItem={({item}) => <ParathreadItem parathread={item} />}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={EmptyView}
          estimatedItemSize={parathreads.length}
        />
      ) : (
        <EmptyView />
      )}
    </SafeView>
  );
}

type ParathreadItemProps = {
  parathread: Parathread;
};

function ParathreadItem({parathread}: ParathreadItemProps) {
  const [days, hours] = parathread.lease?.blockTime || [];

  const AccountIdentityIcon = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        {parathread?.manager && <Identicon value={parathread.manager.account.address} size={30} />}
      </View>
    ),
    [parathread],
  );

  const ParathreadId = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Text>{parathread.id}</Text>
      </View>
    ),
    [parathread],
  );

  return (
    <List.Item
      onPress={() => toParathreadHomepage(String(parathread.homepage))}
      left={AccountIdentityIcon}
      title={
        <View style={styles.manager}>{parathread.manager && <Account account={parathread.manager.account} />}</View>
      }
      description={
        <>
          {parathread.name && <Text>{parathread.name}</Text>}
          {parathread.lease ? <Text>{parathread.lease.period}</Text> : null}
          {days ? <Text>{days || hours ? `${days || ''} ${hours || ''}` : null}</Text> : null}
        </>
      }
      right={ParathreadId}
      style={styles.parathreadItem}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
  },
  manager: {
    marginRight: 20,
  },
  parathreadItem: {
    paddingHorizontal: standardPadding * 2,
  },
});
