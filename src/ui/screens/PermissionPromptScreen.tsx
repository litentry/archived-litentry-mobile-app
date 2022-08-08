import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Padder} from '@ui/components/Padder';
import SafeView from '@ui/components/SafeView';
import {useRequestPermission} from '@atoms/pushNotification';
import globalStyles, {standardPadding} from '@ui/styles';
import {Text, Button, Icon} from '@ui/library';
import {Layout} from '@ui/components/Layout';

type Props = {
  skipPermission?: () => void;
  allowSkip?: boolean;
};

function PermissionPrompt({skipPermission, allowSkip = true}: Props) {
  const {requestPermission} = useRequestPermission();

  return (
    <Layout style={globalStyles.flex}>
      <SafeView>
        <View style={styles.container}>
          <Icon name={'bell-outline'} size={100} />
          <Padder scale={1} />
          <Text variant="headlineSmall">Turn on Notifications</Text>
          <Padder scale={1} />
          <Text variant="bodySmall" style={globalStyles.textCenter}>
            Enable notifications to make sure you don't miss out on important events
          </Text>
          <Padder scale={2} />
          <Button mode="contained" onPress={() => requestPermission()}>
            Allow Notifications
          </Button>
          <Padder scale={0.5} />
          {allowSkip && <Button onPress={skipPermission}>Skip</Button>}
        </View>
      </SafeView>
    </Layout>
  );
}

export const PermissionPromptScreen = React.memo(PermissionPrompt);

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1, padding: standardPadding * 4},
});
