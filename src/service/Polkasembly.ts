const baseUrl = 'polkassembly.io';

export const buildMotionDetailUrl = (
  id: number,
  network: string = 'polkadot',
) => {
  return `https://${network}.${baseUrl}/motion/${id}`;
};
