import React from 'react';
import {render} from 'src/testUtils';
import {FeedbackScreen} from './FeedbackScreen';

// todo: TypeError: (0 , _native.useFocusEffect) is not a function resolve
test('render the ExportAccountWithJsonFileScreen component', () => {
  const {getByText} = render(<FeedbackScreen />);
  expect(getByText('Please write down your feedback here:')).toBeTruthy();
  expect(getByText('Send Feedback')).toBeTruthy();
});
