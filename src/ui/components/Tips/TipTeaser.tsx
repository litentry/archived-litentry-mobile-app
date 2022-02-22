import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from '@ui/library';
import {TipReason} from '@ui/components/Tips/TipReason';
import {Padder} from '@ui/components/Padder';
import {Tip} from 'src/api/hooks/useTips';
import {standardPadding} from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

type TipTeaserProps = {
  tip: Tip;
  onPress: (id: string) => void;
};

function Teaser({tip, onPress}: TipTeaserProps) {
  const {id, who, reason} = tip;

  return (
    <Card style={styles.card} onPress={() => onPress(id)}>
      <Card.Content>
        <AccountTeaser account={who.account} />
        <Padder scale={0.5} />
        <TipReason reason={reason} />
      </Card.Content>
    </Card>
  );
}

export const TipTeaser = React.memo(Teaser);

const styles = StyleSheet.create({
  card: {
    marginBottom: standardPadding,
  },
});
