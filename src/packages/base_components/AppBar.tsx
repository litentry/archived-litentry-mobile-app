import React from 'react';
import {Appbar as PaperAppBar} from 'react-native-paper';

function Action(props: {onPress: () => void; icon: string}) {
  // TV props are added because of ts problems could be fixed in future versions of rn-paper
  return <PaperAppBar.Action tvParallaxProperties={false} hasTVPreferredFocus={false} {...props} />;
}

export const AppBar = {
  ...PaperAppBar,
  Action,
};
