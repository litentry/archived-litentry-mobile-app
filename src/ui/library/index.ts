/**
 *  This is the entry point for third party libraries (UI).
 *  All components from a third party library should be exported here.
 **/
export {
  Provider,
  List,
  Text,
  Card,
  DataTable,
  IconButton,
  Button,
  Portal,
  FAB,
  ActivityIndicator,
  Drawer,
  Switch,
  Divider,
  TextInput,
  HelperText,
  ThemeProvider,
  Appbar as AppBar,
  Snackbar,
  Menu,
  RadioButton,
  Chip,
  Surface,
} from 'react-native-paper';

export type {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

export {useTheme} from './theme';
export {Icon} from './Icon';
export {ProgressChart} from 'react-native-chart-kit';
export {AppHeader} from './AppHeader';
export {Modal} from './Modal';
export {Select} from './Select';
export {Calendar} from './Calendar';
// export {Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs'; TODO use when updated or create our own
export {useBottomSheet, BottomSheetTextInput, useBottomSheetInternal} from './BottomSheet';
export {Skeleton} from './Skeleton';
