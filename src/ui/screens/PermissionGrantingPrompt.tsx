import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Padder} from '@ui/components/Padder';
import SafeView from '@ui/components/SafeView';
import {usePushNotificationsPermissions} from '@hooks/usePushNotificationsPermissions';
import globalStyles, {standardPadding} from '@ui/styles';
import {Caption, Headline, Button, useTheme, Subheading, Icon} from '@ui/library';
import {Layout} from '@ui/components/Layout';

type Props = {
  skipPnPermission?: () => void;
  allowSkip?: boolean;
};

function PermissionGrantingPromptScreen({skipPnPermission, allowSkip}: Props) {
  const {colors} = useTheme();
  const {requestPermissions} = usePushNotificationsPermissions();
  const [error, setError] = React.useState<string>();

  return (
    <Layout style={globalStyles.flex}>
      <SafeView>
        <View style={styles.container}>
          <Icon name={'bell-outline'} size={100} />
          <Padder scale={1} />
          <Headline>Turn on Notifications</Headline>
          <Padder scale={1} />
          <Caption style={globalStyles.textCenter}>
            Enable notifications to make sure you don't miss out on important events
          </Caption>
          {error ? (
            <>
              <Padder scale={1} />
              <Subheading style={[globalStyles.textCenter, {color: colors.error}]}>{error}</Subheading>
            </>
          ) : null}
          <Padder scale={2} />
          <Button
            mode="contained"
            onPress={() =>
              requestPermissions(undefined, {
                onError(e) {
                  console.log(e);
                  setError('Permission denied, please turn the notification on in the settings app!');
                },
              })
            }>
            Allow Notifications
          </Button>
          <Padder scale={0.5} />
          {allowSkip && <Button onPress={skipPnPermission}>Skip</Button>}
        </View>
      </SafeView>
    </Layout>
  );
}

export const PermissionGrantingPrompt = React.memo(PermissionGrantingPromptScreen);

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1, padding: standardPadding * 4},
});
