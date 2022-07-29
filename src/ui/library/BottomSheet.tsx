import React from 'react';
import RNBottomSheet, {
  BottomSheetProps as RNBottomSheetProps,
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {useTheme} from './index';
import {useIsFocused} from '@react-navigation/native';

export {BottomSheetTextInput, useBottomSheetInternal} from '@gorhom/bottom-sheet';

type BottomSheetProps = Omit<RNBottomSheetProps, 'snapPoints'>;

export function useBottomSheet() {
  const isFocused = useIsFocused();
  const {colors} = useTheme();
  const bottomSheetRef = React.useRef<RNBottomSheet>(null);
  const initialSnapPoints = React.useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);
  const {animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout} =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const openBottomSheet = React.useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = React.useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const Backdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  React.useEffect(() => {
    if (!isFocused) {
      closeBottomSheet();
    }
  }, [isFocused, closeBottomSheet]);

  const BottomSheet = React.useCallback(
    ({children, ...props}: BottomSheetProps) => (
      <RNBottomSheet
        keyboardBehavior="fillParent"
        keyboardBlurBehavior="restore"
        handleIndicatorStyle={{backgroundColor: colors.secondary}}
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
        <BottomSheetView onLayout={handleContentLayout}>{children}</BottomSheetView>
      </RNBottomSheet>
    ),
    [colors, Backdrop, animatedSnapPoints, animatedHandleHeight, animatedContentHeight, handleContentLayout],
  );

  return {
    openBottomSheet,
    closeBottomSheet,
    BottomSheet,
  };
}
