import {composeEmailURL, SendEmailOptions} from './email';

test('composeEmailURL test case', () => {
  const emailProps: SendEmailOptions = {
    to: 'test@example.com',
    subject: 'test',
    body: 'test body',
    options: {
      cc: 'test-cc@example.com',
      bcc: 'test-bcc@example.com',
    },
  };
  const expectedUrl =
    'mailto:test@example.com?subject=test&body=test+body&cc=test-cc%40example.com&bcc=test-bcc%40example.com';
  const emailURL = composeEmailURL(emailProps);
  expect(emailURL).toEqual(expectedUrl);
});
