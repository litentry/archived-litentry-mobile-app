import {Linking} from 'react-native';

type SendEmailProps = {
  to: string;
  subject: string;
  body: string;
  options?: {
    cc?: string;
    bcc?: string;
  };
};

export async function sendEmail(props: SendEmailProps) {
  const {to, subject, body, options} = props;
  const {cc, bcc} = options ?? {};

  let url = `mailto:${to}`;

  const searchParams = new URLSearchParams();
  searchParams.append('subject', subject);
  searchParams.append('body', body);
  if (cc) {
    searchParams.append('cc', cc);
  }
  if (bcc) {
    searchParams.append('bcc', bcc);
  }
  // Create email link query
  const query = searchParams.toString();
  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}
