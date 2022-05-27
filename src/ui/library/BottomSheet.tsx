import React from 'react';
import RNBottomSheet, {
  BottomSheetProps as RNBottomSheetProps,
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from './index';

interface BottomSheetProps extends Omit<RNBottomSheetProps, 'snapPoints' | 'children'> {
  children?: React.ReactNode;
}

export function useBottomSheet() {
  const {colors} = useTheme();
  const bottomSheetRef = React.useRef<RNBottomSheet>(null);
  const [bottomSheetContent, setBottomSheetContent] = React.useState<React.ReactNode>();
  const initialSnapPoints = React.useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);
  const {animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout} =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const openBottomSheet = React.useCallback((content?: React.ReactNode) => {
    if (content) {
      setBottomSheetContent(content);
    }
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 200);
  }, []);

  const closeBottomSheet = React.useCallback(() => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setBottomSheetContent(undefined);
    }, 200);
  }, []);

  const Backdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const noContent = React.useMemo(
    () => (
      <View style={styles.noContent}>
        <Text>{``}</Text>
      </View>
    ),
    [],
  );

  const BottomSheet = React.useCallback(
    ({children, ...props}: BottomSheetProps) => (
      <RNBottomSheet
        handleIndicatorStyle={{backgroundColor: colors.accent}}
        handleStyle={{backgroundColor: colors.background}}
        backdropComponent={Backdrop}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={true}
        animateOnMount={true}
        {...props}>
        <BottomSheetView onLayout={handleContentLayout}>
          {children ? children : bottomSheetContent ? bottomSheetContent : noContent}
        </BottomSheetView>
      </RNBottomSheet>
    ),
    [
      colors,
      Backdrop,
      animatedSnapPoints,
      animatedHandleHeight,
      animatedContentHeight,
      handleContentLayout,
      noContent,
      bottomSheetContent,
    ],
  );

  return {
    openBottomSheet,
    closeBottomSheet,
    BottomSheet,
  };
}

const styles = StyleSheet.create({
  noContent: {
    height: 200,
    padding: 20,
  },
});
