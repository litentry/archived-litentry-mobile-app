/* eslint-disable no-restricted-imports */
/**
 *  This is the entry point for third party libraries (UI).
 *  All components from a third party library should be exported here.
 **/
export {
  Provider,
  List,
  Text,
  Title,
  Caption,
  Card,
  Paragraph,
  Subheading,
  Headline,
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
  useTheme,
  RadioButton,
  Chip,
} from 'react-native-paper';

export type {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

export {Icon} from './Icon';
export {ProgressChart} from 'react-native-chart-kit';
export {AppHeader} from './AppHeader';
export {Modal} from './Modal';
export {Select} from './Select';
export {Calendar} from './Calendar';
export {Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
export {useBottomSheet, BottomSheetTextInput} from './BottomSheet';
export {Skeleton} from './Skeleton';
