import React, {useCallback, useState} from 'react';
import BN from 'bn.js';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Select, SelectItem, Modal, Card, Text, Button, IndexPath, Input, Icon, IconProps} from '@ui-kitten/components';
import withRegistrarList, {InjectedPropTypes} from 'src/hoc/withRegistrarList';
import {BN_ZERO, formatBalance} from '@polkadot/util';
import {standardPadding, monofontFamily} from 'src/styles';
import Identicon from '@polkadot/reactnative-identicon';
import Padder from 'presentational/Padder';
import {formatNumberWRTDecimal} from 'src/utils';

const {height, width} = Dimensions.get('window');

type PropTypes = {
  visible: boolean;
  onClose: () => void;
  onSelect: (index: number, fee?: BN) => void;
};
const AlertIcon = (props: IconProps) => <Icon {...props} name="alert-circle-outline" />;

function RegistrarSelectionModal({onSelect, registrars, visible, onClose}: PropTypes & InjectedPropTypes) {
  const [selectedRegistrar, setSelectedRegistrar] = useState<IndexPath | IndexPath[]>();
  const [feeValue, setFeeValue] = useState<BN>();
  const handleSelect = useCallback(() => {
    const index = (selectedRegistrar as IndexPath).row;

    if (feeValue) {
      onSelect(index, feeValue);
    }
  }, [onSelect, selectedRegistrar, feeValue]);

  const feeDisplay = feeValue && (formatNumberWRTDecimal(feeValue).toNumber() / 10000).toString();
  const selectedRegistrarDisplay = selectedRegistrar ? `Registrar #${(selectedRegistrar as IndexPath).row}` : undefined;

  const handleRegistrarSelect = useCallback(
    (index: IndexPath | IndexPath[]) => {
      setSelectedRegistrar(index);

      if (registrars) {
        const unwraped = registrars[(index as IndexPath).row]!.unwrapOr({
          fee: BN_ZERO,
          account: '',
        });

        setFeeValue(unwraped.fee);
      }
    },
    [setSelectedRegistrar, registrars, setFeeValue],
  );

  if (!registrars) {
    return null;
  }

  return (
    <Modal visible={visible} style={styles.container} backdropStyle={styles.backdrop} onBackdropPress={onClose}>
      <Card
        disabled={true}
        header={(props) => (
          <>
            <Text {...props} style={[props?.style, styles.headerStyleOverwrite]} category="h6">
              Choose registrar
            </Text>
            <Text {...props} style={[props?.style, styles.subHeaderOverwrite]} category="s2">
              Select a registrar and specify fee
            </Text>
          </>
        )}
        footer={(props) => (
          <View {...props} style={[props?.style, styles.footerContainer]}>
            <Button style={styles.footerControl} appearance="ghost" size="small" onPress={onClose} status="danger">
              Cancel
            </Button>
            <Button style={styles.footerControl} size="small" onPress={handleSelect}>
              Submit
            </Button>
          </View>
        )}>
        <Select
          label="Registrar"
          selectedIndex={selectedRegistrar}
          value={selectedRegistrarDisplay}
          onSelect={handleRegistrarSelect}>
          {registrars.map((registrar, index) => {
            const unwraped = registrar.unwrapOr({fee: BN_ZERO, account: ''});

            return (
              <SelectItem
                disabled={unwraped.fee.eq(BN_ZERO)}
                key={unwraped.account.toString()}
                accessoryLeft={() => {
                  return <Identicon value={unwraped.account.toString()} size={20} />;
                }}
                title={`#${index}`}
                accessoryRight={() => <Text style={styles.indexText}>{formatBalance(unwraped.fee)}</Text>}
              />
            );
          })}
        </Select>
        <Padder scale={0.5} />
        <Input
          disabled
          value={feeDisplay}
          label="Fee"
          placeholder="Fee for judgement"
          caption="Fee paid to Registrar for providing the Judgement"
          captionIcon={AlertIcon}
        />
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    minHeight: height * 0.5,
  },
  subHeaderOverwrite: {
    paddingTop: standardPadding / 2,
  },
  headerStyleOverwrite: {
    paddingBottom: 0,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  addressText: {
    paddingLeft: standardPadding,
  },
  indexText: {
    paddingLeft: standardPadding,
    fontFamily: monofontFamily,
  },
});

export default withRegistrarList(RegistrarSelectionModal);
