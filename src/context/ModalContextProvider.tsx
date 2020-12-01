import React, {createContext, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Layout} from '@ui-kitten/components';

export type ModalContextValueType = {
  show: (children: React.ReactElement) => void;
};

export const ModalContext = createContext<ModalContextValueType>({
  show: () => undefined,
});

type PropTypes = {children: React.ReactNode};

function ModalContextProvider({children}: PropTypes) {
  const modalRef = useRef<Modalize>(null);
  const [el, setEl] = useState<React.ReactElement | null>(null);
  const show = (toRender: React.ReactElement) => {
    setEl(toRender);
    modalRef.current?.open();
  };

  return (
    <ModalContext.Provider value={{show}}>
      {children}
      <Modalize
        ref={modalRef}
        threshold={250}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        handlePosition="outside"
        adjustToContentHeight
        closeOnOverlayTap
        panGestureEnabled>
        <Layout style={styles.modal}>{el}</Layout>
      </Modalize>
    </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  modal: {},
});

export default ModalContextProvider;
