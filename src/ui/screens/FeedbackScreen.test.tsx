import React from 'react';
import {render} from 'src/testUtils';
import {FeedbackScreen} from './FeedbackScreen';
import {NavigationContainer} from '@react-navigation/native';

jest.useFakeTimers();

test('render the FeedbackScreen component', () => {
  const {getByText} = render(
    <NavigationContainer>
      {' '}
      <FeedbackScreen />{' '}
    </NavigationContainer>,
  );
  expect(getByText('Please write down your feedback here:')).toBeTruthy();
  expect(getByText('Send Feedback')).toBeTruthy();
});
