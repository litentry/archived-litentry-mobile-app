import {useFocusEffect} from '@react-navigation/native';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {Caption, Text, TextInput, Button, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {noop} from 'lodash';
import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {sendEmail} from 'src/utils/email';
import HyperLink from 'react-native-hyperlink';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useKeyboardStatus} from 'src/hooks/useKeyboardStatus';

const FEEDBACK_EMAIL = 'app-feedback@litentry.com';

export function FeedbackScreen() {
  const {colors} = useTheme();
  const [body, setBody] = React.useState('');
  const {status: keyboardStatus} = useKeyboardStatus();
  const [status, setStatus] = React.useState<'INITIAL' | 'ERROR' | 'SUCCESS'>('INITIAL');
  useFocusEffect(
    React.useCallback(() => {
      setStatus('INITIAL');
      setBody('');
    }, []),
  );

  const sendFeedback = async () => {
    sendEmail({to: FEEDBACK_EMAIL, subject: 'Litentry Feedback', body})
      .then(() => setStatus('SUCCESS'))
      .catch(() => setStatus('ERROR'));
  };

  if (status === 'SUCCESS') {
    return (
      <Layout style={globalStyles.fillCenter}>
        <Text style={styles.successMessage}>Thank you for your feedback!</Text>
      </Layout>
    );
  }

  if (status === 'ERROR') {
    return (
      <Layout style={globalStyles.fillCenter}>
        <Text style={styles.errorMessage}>{`We are having trouble trying to open your mail app.`}</Text>
        <HyperLink linkStyle={{color: colors.primary}} linkDefault>
          <Caption>Please email us at {FEEDBACK_EMAIL}</Caption>
        </HyperLink>
      </Layout>
    );
  }

  return (
    <SafeView edges={noTopEdges}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.flex}>
        <ScrollView style={styles.container}>
          <View>
            <Text>Please write down your feedback here:</Text>
            <Padder scale={1} />
            <TextInput
              multiline={true}
              style={styles.input}
              numberOfLines={10}
              onChangeText={setBody}
              autoComplete={'off'}
              placeholder="feedback..."
              value={body}
            />
            <Padder scale={1} />
            <Button mode="outlined" disabled={!body} onPress={body ? sendFeedback : noop}>
              Send Feedback
            </Button>
          </View>
          <Padder scale={keyboardStatus === 'visible' ? 6 : 2} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
  input: {
    minHeight: 200,
  },
  successMessage: {
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
  },
});
