import React from 'react';
import {Icon, Paragraph} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import globalStyles, {colorRed, colorGray} from '@ui/styles';
import {Padder} from './Padder';

type PropTypes = {
  text: string;
  warning?: boolean;
};

function InfoBanner(props: PropTypes) {
  const {text, warning = false} = props;

  return (
    <>
      <Layout style={globalStyles.rowAlignCenter}>
        <Icon size={25} color={warning ? colorRed : colorGray} name="information-outline" />
        <Padder scale={0.5} />
        <Paragraph numberOfLines={3}>{text}</Paragraph>
      </Layout>
      <Padder scale={1} />
    </>
  );
}

export default InfoBanner;
