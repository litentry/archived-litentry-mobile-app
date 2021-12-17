import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Card as PaperCard} from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperCard>;

export function Card({onPress, children, ...rest}: Props) {
  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <PaperCard {...rest}>{children}</PaperCard>
    </TouchableOpacity>
  ) : (
    <PaperCard {...rest}>{children}</PaperCard>
  );
}

Card.Content = PaperCard.Content;
Card.Actions = PaperCard.Actions;
Card.Cover = PaperCard.Cover;
Card.Title = PaperCard.Title;
