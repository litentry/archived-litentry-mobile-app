import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {FeedbackScreen} from './FeedbackScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Linking} from 'react-native';

const feedback = 'test feedback';

describe('FeedbackScreen', () => {
  it('should render the FeedbackScreen component', async () => {
    const {findByText, findByTestId} = render(
      <NavigationContainer>
        <FeedbackScreen />
      </NavigationContainer>,
    );
    await findByText('Please write down your feedback here:');
    expect(await findByTestId('send-feedback-button')).toBeDisabled();
  });

  it('should enter the feedback and press submit button', async () => {
    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    const {findByPlaceholderText, findByTestId} = render(
      <NavigationContainer>
        <FeedbackScreen />
      </NavigationContainer>,
    );
    const sendFeedbackButton = await findByTestId('send-feedback-button');
    fireEvent.changeText(await findByPlaceholderText('feedback...'), feedback);
    expect(sendFeedbackButton).toBeEnabled();
    fireEvent.press(sendFeedbackButton);
    expect(linkingSpy).toBeCalledWith('mailto:app-feedback@litentry.com?subject=Litentry+Feedback&body=test+feedback');
  });
});
