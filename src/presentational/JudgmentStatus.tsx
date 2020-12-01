import React from 'react';
import {StyleSheet} from 'react-native';
import {RegistrationJudgement} from '@polkadot/types/interfaces';
import {Layout, Text} from '@ui-kitten/components';
import {standardPadding, colorGreen} from 'src/styles';

type PropTypes = {
  judgement: RegistrationJudgement;
};

function JudgmentStatus(props: PropTypes) {
  const {judgement} = props;

  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>
        {judgement[1].isKnownGood ? 'KnownGood' : 'Unknown'}
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorGreen,
    paddingVertical: standardPadding / 4,
    paddingHorizontal: standardPadding / 2,
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: standardPadding / 2,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fcfcfc',
  },
});

export default JudgmentStatus;
