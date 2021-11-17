import React from 'react';
import {Appbar as PaperAppBar} from 'react-native-paper';

function Action(props: {onPress: () => void; icon: string}) {
  // TV props are added because of ts problems could be fixed in future versions of rn-paper
  return <PaperAppBar.Action tvParallaxProperties={false} hasTVPreferredFocus={false} {...props} />;
}

function BackAction(props: {onPress: () => void}) {
  // TV props are added because of ts problems could be fixed in future versions of rn-paper
  return <PaperAppBar.BackAction tvParallaxProperties={false} hasTVPreferredFocus={false} {...props} />;
}

export const AppBar = {
  ...PaperAppBar,
  Action,
  BackAction,
};

export function AppBarWithBackBtn(props: {title: string; onPress: () => void}) {
  return (
    <AppBar.Header>
      <AppBar.BackAction onPress={props.onPress} />
      <AppBar.Content title={props.title} />
    </AppBar.Header>
  );
}
