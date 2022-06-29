import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {atom, RecoilState, useRecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppState} from 'src/hooks/useAppState';

type AuthorizationStatus = FirebaseMessagingTypes.AuthorizationStatus;

enum PUSH_TOPIC_ID {
  NEW_TREASURY_PROPOSAL = 'treasury.Proposed',
  TIP_SUGGESTION = 'tips.NewTip',
  NEW_REFERENDUM = 'democracy.Started',
}

type TogglePushTopicPayload = {
  id: PUSH_TOPIC_ID;
  subscribe: boolean;
};

type PushTopicSubscription = {
  [key in PUSH_TOPIC_ID]: {isSubscribed: boolean};
};

const PUSH_TOPIC_SUBSCRIPTION_INITIAL_STATE = {
  [PUSH_TOPIC_ID.NEW_TREASURY_PROPOSAL]: {isSubscribed: false},
  [PUSH_TOPIC_ID.TIP_SUGGESTION]: {isSubscribed: false},
  [PUSH_TOPIC_ID.NEW_REFERENDUM]: {isSubscribed: false},
};

const PUSH_TOPIC_LABEL = {
  [PUSH_TOPIC_ID.NEW_TREASURY_PROPOSAL]: 'New Treasury Proposal',
  [PUSH_TOPIC_ID.TIP_SUGGESTION]: 'Tip Suggestion',
  [PUSH_TOPIC_ID.NEW_REFERENDUM]: 'New Referendum',
};

const pushNotificationSubscriptionState: RecoilState<PushTopicSubscription> = atom({
  key: 'pushNotificationSubscriptionState',
  default: PUSH_TOPIC_SUBSCRIPTION_INITIAL_STATE,
  effects: [persistAtom],
});

export function usePushTopics() {
  const [pushTopics, setPushTopics] = useRecoilState(pushNotificationSubscriptionState);

  const topics = useMemo(() => {
    const topicIds = Object.keys(pushTopics) as PUSH_TOPIC_ID[];
    return topicIds.map((topicId) => ({
      id: topicId,
      isSubscribed: pushTopics[topicId].isSubscribed,
      label: PUSH_TOPIC_LABEL[topicId],
    }));
  }, [pushTopics]);

  const toggleTopic = useCallback(
    ({id, subscribe}: TogglePushTopicPayload) => {
      subscribe ? messaging().subscribeToTopic(id) : messaging().unsubscribeFromTopic(id);
      setPushTopics({
        ...pushTopics,
        [id]: {isSubscribed: subscribe},
      });
    },
    [pushTopics, setPushTopics],
  );

  const subscribeToAllTopics = useCallback(() => {
    const ids = Object.keys(pushTopics) as PUSH_TOPIC_ID[];
    const subscriptionPromises = ids.map((topicId) => messaging().subscribeToTopic(topicId));

    Promise.all(subscriptionPromises);

    const subscribedTopics = ids.reduce((subscription, topicId) => {
      subscription[topicId] = {isSubscribed: true};
      return subscription;
    }, {} as PushTopicSubscription);

    setPushTopics(subscribedTopics);
  }, [pushTopics, setPushTopics]);

  const unSubscribeToAllTopics = useCallback(() => {
    const ids = Object.keys(pushTopics) as PUSH_TOPIC_ID[];
    const subscriptionPromises = ids.map((topicId) => messaging().subscribeToTopic(topicId));

    Promise.all(subscriptionPromises);

    const unSubscribedTopics = ids.reduce((subscription, topicId) => {
      subscription[topicId] = {isSubscribed: false};
      return subscription;
    }, {} as PushTopicSubscription);

    setPushTopics(unSubscribedTopics);
  }, [pushTopics, setPushTopics]);

  return {
    topics,
    toggleTopic,
    subscribeToAllTopics,
    unSubscribeToAllTopics,
  };
}

const pushNotificationPermissionState: RecoilState<{isSkipped: boolean}> = atom({
  key: 'pushNotificationPermissionState',
  default: {isSkipped: false},
  effects: [persistAtom],
});

const isPermissionGranted = (status?: AuthorizationStatus) =>
  status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL;

const isPermissionDenied = (status?: AuthorizationStatus) => status === messaging.AuthorizationStatus.DENIED;

const isPermissionNotDetermined = (status?: AuthorizationStatus) => {
  return status != null ? status === messaging.AuthorizationStatus.NOT_DETERMINED : true;
};

function useCheckAuthorizationStatus() {
  const [isChecking, setIsChecking] = useState(true);
  const [authorizationStatus, setAuthorizationStatus] = useState<AuthorizationStatus>();

  useEffect(() => {
    messaging()
      .hasPermission()
      .then((status) => {
        setIsChecking(false);
        setAuthorizationStatus(status);
      });
  }, []);

  return {
    isChecking,
    authorizationStatus,
    setAuthorizationStatus,
  };
}

export function usePushNotificationsPermission() {
  const {didAppCameToForeground} = useAppState();
  const {subscribeToAllTopics} = usePushTopics();
  const {isChecking, authorizationStatus, setAuthorizationStatus} = useCheckAuthorizationStatus();
  const [permissionState, setPermissionState] = useRecoilState(pushNotificationPermissionState);

  const skiPushNotificationPermission = useCallback(() => {
    setPermissionState({isSkipped: true});
  }, [setPermissionState]);

  useEffect(() => {
    messaging()
      .hasPermission()
      .then((status) => {
        setAuthorizationStatus(status);
      });
  }, [setAuthorizationStatus]);

  useEffect(() => {
    if (didAppCameToForeground) {
      messaging()
        .hasPermission()
        .then((status) => {
          setAuthorizationStatus(status);
        });
    }
  }, [didAppCameToForeground, setAuthorizationStatus]);

  useEffect(() => {
    messaging()
      .hasPermission()
      .then((status) => {
        setAuthorizationStatus(status);
      });
  }, [setAuthorizationStatus]);

  const requestPermission = useCallback(() => {
    messaging()
      .requestPermission()
      .then((status) => {
        if (isPermissionGranted(status)) {
          setAuthorizationStatus(status);
          subscribeToAllTopics();
        }
      });
  }, [subscribeToAllTopics, setAuthorizationStatus]);

  return {
    isCheckingAuthorizationStatus: isChecking,
    skiPushNotificationPermission,
    authorizationStatus,
    isPermissionSkipped: permissionState.isSkipped,
    isPermissionPromptNeeded: !permissionState.isSkipped && isPermissionNotDetermined(authorizationStatus),
    requestPermission,
    isPermissionDenied: isPermissionDenied(authorizationStatus),
    isPermissionGranted: isPermissionGranted(authorizationStatus),
    isPermissionNotDetermined: isPermissionNotDetermined(authorizationStatus),
  };
}
