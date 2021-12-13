import React, {createContext, useRef, useCallback, useMemo, useState, useContext} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {Notification, NotificationProperties} from 'react-native-in-app-message';
import {standardPadding} from '@ui/styles';
import {truncate} from 'lodash';

type InAppNotificationPayloadType =
  | {
      type: 'TextInfo';
      opts: NotificationProperties;
    }
  | {
      type: 'Component';
      renderContent: () => React.ReactNode;
      opts?: NotificationProperties;
    };

type InAppNotificationContextValueType = {
  trigger: (payload: InAppNotificationPayloadType) => void;
};

export const InAppNotificationContext = createContext<InAppNotificationContextValueType>({
  trigger: () => undefined,
});

export const useInAppNotification = () => useContext(InAppNotificationContext);

type PropTypes = {
  children: React.ReactNode;
};

const DEFAULT_OPTIONS = {duration: 5000, tapticFeedback: true};

function InAppNotificationContextProvider({children}: PropTypes) {
  const notificationRef = useRef<Notification>(null);
  const [notificationProps, setNotificationProps] = useState<NotificationProperties>({});
  const trigger = useCallback((payload: InAppNotificationPayloadType) => {
    if (payload.type === 'TextInfo') {
      setNotificationProps({...DEFAULT_OPTIONS, ...payload.opts});
    } else {
      setNotificationProps({
        ...DEFAULT_OPTIONS,
        ...(payload.opts || {}),
        customComponent: (
          <View style={[Platform.OS === 'ios' ? styles.customView : styles.customViewAndroid]}>
            {payload.renderContent()}
          </View>
        ),
      });
    }
    notificationRef.current?.show();
  }, []);

  const value = useMemo(() => ({trigger}), [trigger]);

  return (
    <InAppNotificationContext.Provider value={value}>
      {children}
      <Notification {...notificationProps} ref={notificationRef} />
    </InAppNotificationContext.Provider>
  );
}

const styles = StyleSheet.create({
  customView: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  customViewAndroid: {
    width: '100%',
    overflow: 'hidden',
  },
});

type RichTextComponentPropTypes = {
  title: string;
  message: string;
};

export const InAppNotificationContent = (props: RichTextComponentPropTypes) => {
  const {title, message} = props;

  return (
    <View style={{padding: standardPadding * 2}}>
      <Text style={richTextComponentStyles.title}>{title}</Text>
      <Text>
        {truncate(message, {
          length: 150,
          separator: /,? +/,
        })}
      </Text>
    </View>
  );
};

const richTextComponentStyles = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: 16, paddingBottom: standardPadding},
  message: {},
});

export default InAppNotificationContextProvider;
