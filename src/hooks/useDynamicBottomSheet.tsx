import React from 'react';
import {useBottomSheet, BottomSheetProps} from '@ui/library';

type BottomSheets = {
  type: string;
  content: JSX.Element;
}[];

type DynamicBottomSheetProps = Omit<BottomSheetProps, 'children'>;

export function useDynamicBottomSheet() {
  const {openBottomSheet, closeBottomSheet, BottomSheet} = useBottomSheet();
  const [bottomSheetType, setBottomSheetType] = React.useState('');

  const makeDynamicBottomSheet = React.useCallback(
    (bottomSheets: BottomSheets) => {
      const bottomSheetContent = bottomSheets.find((bottomSheet) => bottomSheet.type === bottomSheetType)?.content;

      const onOpenBottomSheet = (type: string) => {
        setBottomSheetType(type);
        setTimeout(openBottomSheet, 200);
      };

      const DynamicBottomSheet = (props: DynamicBottomSheetProps) => (
        <BottomSheet {...props}>{bottomSheetContent}</BottomSheet>
      );

      return {
        openBottomSheet: onOpenBottomSheet,
        BottomSheet: DynamicBottomSheet,
      };
    },
    [bottomSheetType, openBottomSheet, BottomSheet],
  );

  return {
    closeBottomSheet,
    makeDynamicBottomSheet,
  };
}
