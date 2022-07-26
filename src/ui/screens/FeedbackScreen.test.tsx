import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {FeedbackScreen} from './FeedbackScreen';
import {Linking} from 'react-native';

const feedback = 'test feedback';

const mockSendEmail = jest.fn(() => Promise.resolve());

jest.mock('src/utils/email', () => {
  return {
    sendEmail: () => mockSendEmail(),
  };
});

describe('FeedbackScreen', () => {
  it('should render the FeedbackScreen component', async () => {
    const {findByText, findByTestId} = render(<FeedbackScreen />);
    await findByText('Please write down your feedback here:');
    expect(await findByTestId('send-feedback-button')).toBeDisabled();
  });

  it('should enter the feedback and press submit button', async () => {
    const {findByPlaceholderText, findByTestId, findByText} = render(<FeedbackScreen />);
    const sendFeedbackButton = await findByTestId('send-feedback-button');
    fireEvent.changeText(await findByPlaceholderText('feedback...'), feedback);
    expect(sendFeedbackButton).toBeEnabled();
    fireEvent.press(sendFeedbackButton);
    await waitFor(() => {
      expect(mockSendEmail).toBeCalledTimes(1);
    });
    await findByText('Thank you for your feedback!');
  });
});
