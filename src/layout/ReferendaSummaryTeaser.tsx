import SectionTeaserContainer from 'presentational/SectionTeaserContainer';
import React from 'react';
import {View} from 'react-native';

type Props = {
  onMorePress: () => void;
};

export function ReferendaSummaryTeaser(props: Props) {
  return (
    <SectionTeaserContainer onMorePress={props.onMorePress} title="Referenda">
      <View />
    </SectionTeaserContainer>
  );
}
