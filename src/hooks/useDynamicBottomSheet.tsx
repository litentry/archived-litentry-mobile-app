import React from 'react';
import {useBottomSheet, BottomSheetProps} from '@ui/library';

type DynamicBottomSheetProps = Omit<BottomSheetProps, 'children'>;

export function useDynamicBottomSheet() {
  const {openBottomSheet, closeBottomSheet, BottomSheet} = useBottomSheet();
  const [bottomSheetContent, setBottomSheetContent] = React.useState<JSX.Element>();

  const onOpenBottomSheet = React.useCallback(
    (content: JSX.Element) => {
      setBottomSheetContent(content);
      setTimeout(openBottomSheet, 200);
    },
    [openBottomSheet],
  );

  const DynamicBottomSheet = React.useCallback(
    (props: DynamicBottomSheetProps) => <BottomSheet {...props}>{bottomSheetContent}</BottomSheet>,
    [bottomSheetContent, BottomSheet],
  );

  return {
    closeBottomSheet,
    openBottomSheet: onOpenBottomSheet,
    BottomSheet: DynamicBottomSheet,
  };
}
