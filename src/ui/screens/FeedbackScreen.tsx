import {useFocusEffect} from '@react-navigation/native';
import {Padder} from '@ui/components/Padder';
import {Caption, Text, TextInput, Button} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {noop} from 'lodash';
import React from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {sendEmail} from 'src/utils/email';

const FEEDBACK_EMAIL = 'feedback@litentry.com';

export function FeedbackScreen() {
  const [body, setBody] = React.useState('');

  const [status, setStatus] = React.useState<'INITIAL' | 'ERROR' | 'SUCCESS'>('INITIAL');
  useFocusEffect(React.useCallback(() => setStatus('INITIAL'), []));

  const sendFeedback = async () => {
    sendEmail({to: FEEDBACK_EMAIL, subject: 'Litentry Feedback', body})
      .then(() => setStatus('SUCCESS'))
      .catch(() => setStatus('ERROR'));
  };

  if (status === 'SUCCESS') {
    return (
      <View style={globalStyles.centeredContainer}>
        <Text style={styles.successMessage}>Thank you for your feedback!</Text>
      </View>
    );
  }

  if (status === 'ERROR') {
    return (
      <View style={globalStyles.centeredContainer}>
        <Text style={styles.errorMessage}>Sorry, there was an error sending your feedback.</Text>
        <Caption>Please email us at {FEEDBACK_EMAIL}</Caption>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.flex}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text>Please write down your feedback here:</Text>
          <Padder scale={1} />
          <TextInput
            multiline={true}
            style={styles.input}
            numberOfLines={5}
            onChangeText={setBody}
            autoComplete={'off'}
            placeholder="feedback..."
          />
          <Padder scale={1} />
          <Button mode="outlined" disabled={!body} onPress={body ? sendFeedback : noop}>
            Send Feedback
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    color: 'red',
  },
});
