import React from 'react';
import {View, StyleSheet} from 'react-native';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {RouteProp} from '@react-navigation/native';
import {ParachainsStackParamList} from 'src/navigation/navigation';
import {Text, Divider, useTheme, ListItem, Icon} from '@ui-kitten/components';
import Padder from 'presentational/Padder';
import {BlockTime} from 'layout/BlockTime';
import {useParachainEvents} from 'src/api/hooks/useParachainEvents';
import {formatNumber, hexToBn} from '@polkadot/util';
import {monofontFamily} from 'src/styles';

type ScreenProps = {
  route: RouteProp<ParachainsStackParamList, 'parachainDetails'>;
};

export function ParachainDetailsScreen({route}: ScreenProps) {
  const {id, name, period, blocks} = route.params;
  const theme = useTheme();

  const events = useParachainEvents();

  return (
    <SafeView edges={noTopEdges}>
      <View style={[styles.container, {borderColor: theme['border-basic-color-4']}]}>
        <Padder scale={1} />
        <View style={styles.parachainNameContainer}>
          <Text category="s1" style={styles.text}>
            {name}
          </Text>
          <Text category="s1" style={styles.text}>{`#${id}`}</Text>
        </View>
        <Padder scale={1} />
        <Divider />
        <View style={styles.detailsContainer}>
          <ListItem
            disabled
            title="Lease"
            accessoryLeft={() => <Icon name="clock-outline" fill={theme['color-basic-600']} style={styles.icon} />}
            accessoryRight={() => (
              <View style={styles.accessoryRight}>
                {period ? <Text style={styles.text}>{period}</Text> : null}
                {blocks ? <BlockTime blockNumber={hexToBn(blocks)} /> : null}
              </View>
            )}
          />
          <ListItem
            disabled
            title="Lifecycle"
            accessoryLeft={() => <Icon name="sync-outline" fill={theme['color-basic-600']} style={styles.icon} />}
            accessoryRight={() => (
              <View style={styles.accessoryRight}>
                <Text style={styles.text}>{`Parachain`}</Text>
              </View>
            )}
          />
          <Padder scale={1} />
        </View>
      </View>

      <View style={styles.eventsContainer}>
        <ListItem
          disabled
          title="Included"
          accessoryRight={() => (
            <View style={styles.accessoryRight}>
              {events.lastIncluded[id] ? (
                <Text style={styles.text}>{formatNumber(events.lastIncluded[id]?.blockNumber)}</Text>
              ) : null}
            </View>
          )}
        />
        <ListItem
          disabled
          title="Backed"
          accessoryRight={() => (
            <View style={styles.accessoryRight}>
              {events.lastBacked[id] ? (
                <Text style={styles.text}>{formatNumber(events.lastBacked[id]?.blockNumber)}</Text>
              ) : null}
            </View>
          )}
        />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
  },
  detailsContainer: {
    marginHorizontal: 10,
  },
  eventsContainer: {
    marginHorizontal: 15,
  },
  parachainNameContainer: {
    alignItems: 'center',
  },
  accessoryRight: {
    alignItems: 'flex-end',
  },
  icon: {
    width: 25,
    height: 25,
  },
  text: {
    fontFamily: monofontFamily,
  },
});
