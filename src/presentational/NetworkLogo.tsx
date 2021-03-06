import React from 'react';
import {Image} from 'react-native';
import PolkadotLog from 'image/Polkadot.png';
import KusamaLogo from 'image/Kusama.png';
import {SupportedNetworkType} from 'src/types';

const PlaceholderImg = null;

const LogoMap = {
  ethereum: PlaceholderImg,
  litentry_test: PlaceholderImg,
  polkadot: PolkadotLog,
  reserved1: PlaceholderImg,
  kusama: KusamaLogo,
  reserved3: PlaceholderImg,
  katalchain: PlaceholderImg,
  plasm: PlaceholderImg,
  bifrost: PlaceholderImg,
  edgeware: PlaceholderImg,
  karura: PlaceholderImg,
  reynolds: PlaceholderImg,
  acala: PlaceholderImg,
  laminar: PlaceholderImg,
  polymath: PlaceholderImg,
  substratee: PlaceholderImg,
  totem: PlaceholderImg,
  synesthesia: PlaceholderImg,
  kulupu: PlaceholderImg,
  dark: PlaceholderImg,
  darwinia: PlaceholderImg,
  geek: PlaceholderImg,
  stafi: PlaceholderImg,
  'dock-testnet': PlaceholderImg,
  'dock-mainnet': PlaceholderImg,
  shift: PlaceholderImg,
  zero: PlaceholderImg,
  alphaville: PlaceholderImg,
  subsocial: PlaceholderImg,
  phala: PlaceholderImg,
  robonomics: PlaceholderImg,
  datahighway: PlaceholderImg,
  centrifuge: PlaceholderImg,
  nodle: PlaceholderImg,
  substrate: PlaceholderImg,
  reserved43: PlaceholderImg,
  chainx: PlaceholderImg,
  reserved46: PlaceholderImg,
  reserved47: PlaceholderImg,
};

type PropTypes = {
  width?: number;
  height?: number;
  name: SupportedNetworkType;
};

function NetworkLogo({name, width, height}: PropTypes) {
  return (
    <Image
      source={LogoMap[name]}
      style={{width: width || 40, height: height || 40}}
    />
  );
}

export default NetworkLogo;
