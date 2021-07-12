import SeactionTeaserContainer from 'presentational/SectionTeaserContainer';
import React from 'react';
import {View} from 'react-native';

type Props = {
  onMorePress: () => void;
};

export function ReferendaSummaryTeaser(props: Props) {
  return (
    <SeactionTeaserContainer onMorePress={props.onMorePress} title="Refernda">
      <View />
    </SeactionTeaserContainer>
  );
}
