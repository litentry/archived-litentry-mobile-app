import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import {Layout} from '@ui-kitten/components';
import qrcode from 'qrcode-generator';
import {stringToU8a} from '@polkadot/util';

type PropTypes = {data: string; dimention: number};

function QRCode(props: PropTypes) {
  const {dimention, data} = props;
  const [dataUri, setDataUri] = useState('');

  useEffect(() => {
    const qr = qrcode(0, 'M');

    qr.addData(stringToU8a(data) as any, 'Byte');
    qr.make();

    setTimeout(() => {
      setDataUri(qr.createDataURL(16, 0));
    }, 300);
  }, [data]);

  return (
    <Layout
      style={[
        styles.container,
        {width: dimention + 20, height: dimention + 20},
      ]}>
      {dataUri ? (
        <Image
          style={{width: dimention, height: dimention}}
          source={{uri: dataUri, width: dimention, height: dimention}}
        />
      ) : (
        <ActivityIndicator />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRCode;
