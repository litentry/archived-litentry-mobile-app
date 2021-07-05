import {Icon, Text, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import {CallInspector, formatCallMeta} from 'src/packages/call_inspector/CallInspector';
import type {Proposal as ProposalType} from '@polkadot/types/interfaces';

export function Proposal({
  proposal,
  accessoryLeft,
  accessoryRight,
}: {
  proposal: ProposalType;
  accessoryLeft?: () => React.ReactNode;
  accessoryRight?: () => React.ReactNode;
}) {
  const theme = useTheme();
  const {meta, method, section} = proposal.registry.findMetaCall(proposal.callIndex);
  const [open, setOpen] = useState(false);

  return (
    <View style={motionStyle.container}>
      <View style={motionStyle.mainRow}>
        {accessoryLeft?.()}
        <TouchableOpacity onPress={() => setOpen(!open)} style={motionStyle.titleContainer}>
          <Text category={'p1'} style={motionStyle.title} numberOfLines={1}>
            {section}.{method}
          </Text>
          <Icon
            name={open ? 'arrow-up-outline' : 'arrow-down-outline'}
            style={globalStyles.icon}
            fill={theme['color-basic-600']}
          />
        </TouchableOpacity>
        {accessoryRight?.()}
      </View>
      {open ? (
        <View style={motionStyle.footer}>
          <Text category={'c1'} style={[motionStyle.desc, {color: theme['color-basic-600']}]}>{`${formatCallMeta(
            meta,
          )}`}</Text>
          <Padder scale={1} />
          <CallInspector call={proposal} />
        </View>
      ) : null}
    </View>
  );
}

const motionStyle = StyleSheet.create({
  container: {paddingVertical: standardPadding},
  mainRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  titleContainer: {padding: standardPadding, flexDirection: 'row', flex: 1, alignItems: 'center'},
  title: {},
  desc: {paddingHorizontal: standardPadding},
  footer: {paddingVertical: standardPadding, paddingHorizontal: standardPadding / 2},
});
