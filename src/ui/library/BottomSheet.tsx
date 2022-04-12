import React from 'react';
import RNBottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {useTheme} from './index';

type BottomSheetProps = {
  children: React.ReactNode;
};

export function useBottomSheet() {
  const {colors} = useTheme();
  const bottomSheetRef = React.useRef<RNBottomSheet>(null);
  const initialSnapPoints = React.useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);
  const {animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout} =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const Backdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const BottomSheet = React.useCallback(
    ({children}: BottomSheetProps) => (
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
        animateOnMount={true}>
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
