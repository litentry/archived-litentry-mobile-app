import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {atom, RecoilState, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppState} from 'src/hooks/useAppState';

type AuthorizationStatus = FirebaseMessagingTypes.AuthorizationStatus;

enum SUBSCRIPTION_ID {
  NEW_TREASURY_PROPOSAL = 'treasury.Proposed',
  TIP_SUGGESTION = 'tips.NewTip',
  NEW_REFERENDUM = 'democracy.Started',
}

type Subscription = {
  [key in SUBSCRIPTION_ID]: {isSubscribed: boolean};
};

const SUBSCRIPTION_INITIAL_STATE = {
  [SUBSCRIPTION_ID.NEW_TREASURY_PROPOSAL]: {isSubscribed: false},
  [SUBSCRIPTION_ID.TIP_SUGGESTION]: {isSubscribed: false},
  [SUBSCRIPTION_ID.NEW_REFERENDUM]: {isSubscribed: false},
};

const SUBSCRIPTION_LABEL = {
  [SUBSCRIPTION_ID.NEW_TREASURY_PROPOSAL]: 'New Treasury Proposal',
  [SUBSCRIPTION_ID.TIP_SUGGESTION]: 'Tip Suggestion',
  [SUBSCRIPTION_ID.NEW_REFERENDUM]: 'New Referendum',
};

const subscriptionState: RecoilState<Subscription> = atom({
  key: 'pushNotificationSubscription',
  default: SUBSCRIPTION_INITIAL_STATE,
  effects: [persistAtom],
});

const isPermissionGranted = (status: AuthorizationStatus) =>
  status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL;

const isPermissionDenied = (status: AuthorizationStatus) => status === messaging.AuthorizationStatus.DENIED;

const isPermissionNotDetermined = (status: AuthorizationStatus) =>
  status === messaging.AuthorizationStatus.NOT_DETERMINED;

export function usePushTopics() {
  const [subscriptionTopics, setSubscriptionTopics] = useRecoilState(subscriptionState);

  const topics = useMemo(() => {
    const topicIds = Object.keys(subscriptionTopics) as SUBSCRIPTION_ID[];
    return topicIds.map((topicId) => ({
      id: topicId,
      isSubscribed: subscriptionTopics[topicId].isSubscribed,
      label: SUBSCRIPTION_LABEL[topicId],
    }));
  }, [subscriptionTopics]);

  const toggleTopic = useCallback(
    ({id, subscribe}: {id: SUBSCRIPTION_ID; subscribe: boolean}) => {
      // optimistic update
      setSubscriptionTopics({
        ...subscriptionTopics,
        [id]: {isSubscribed: subscribe},
      });

      const toggleSubscriptionPromise = subscribe
        ? messaging().subscribeToTopic(id)
        : messaging().unsubscribeFromTopic(id);

      // restore previous state if failing
      toggleSubscriptionPromise.catch(() => {
        setSubscriptionTopics({
          ...subscriptionTopics,
          [id]: {isSubscribed: !subscribe},
        });
      });
    },
    [subscriptionTopics, setSubscriptionTopics],
  );

  const subscribeToAllTopics = useCallback(async () => {
    const successResults = {} as Subscription;

    for (const id in subscriptionTopics) {
      const error = await messaging().subscribeToTopic(id);
      if (error == null) {
        successResults[id as SUBSCRIPTION_ID] = {isSubscribed: true};
      }
    }

    setSubscriptionTopics({...subscriptionTopics, ...successResults});
  }, [subscriptionTopics, setSubscriptionTopics]);

  const unSubscribeToAllTopics = useCallback(async () => {
    const successResults = {} as Subscription;

    for (const id in subscriptionTopics) {
      const error = await messaging().unsubscribeFromTopic(id);
      if (error == null) {
        successResults[id as SUBSCRIPTION_ID] = {isSubscribed: false};
      }
    }

    setSubscriptionTopics({...subscriptionTopics, ...successResults});
  }, [subscriptionTopics, setSubscriptionTopics]);

  return {
    topics,
    toggleTopic,
    subscribeToAllTopics,
    unSubscribeToAllTopics,
  };
}

const permissionState: RecoilState<{isSkipped: boolean}> = atom({
  key: 'pushNotificationPermission',
  default: {isSkipped: false},
  effects: [persistAtom],
});

export function useSkipPermission() {
  const updatePermissionState = useSetRecoilState(permissionState);

  const skipPermission = useCallback(() => {
    updatePermissionState({isSkipped: true});
  }, [updatePermissionState]);

  return {
    skipPermission,
  };
}

const authorizationStatusState = atom({
  key: 'pushNotificationAuthorizationStatus',
  default: messaging.AuthorizationStatus.NOT_DETERMINED,
});

export function useAuthorizationStatus() {
  const [authorizationStatus, setAuthorizationStatus] = useRecoilState(authorizationStatusState);

  return {
    authorizationStatus,
    setAuthorizationStatus,
  };
}

export function useRequestPermission() {
  const {subscribeToAllTopics} = usePushTopics();
  const updateAuthorizationStatus = useSetRecoilState(authorizationStatusState);

  const requestPermission = useCallback(() => {
    messaging()
      .requestPermission()
      .then((status) => {
        updateAuthorizationStatus(status);
        if (isPermissionGranted(status)) {
          subscribeToAllTopics();
        }
      });
  }, [updateAuthorizationStatus, subscribeToAllTopics]);

  return {
    requestPermission,
  };
}

export function useCheckAuthorizationStatus() {
  const [isChecking, setIsChecking] = useState(true);
  const {didAppCameToForeground} = useAppState();
  const updateAuthorizationStatus = useSetRecoilState(authorizationStatusState);

  useEffect(() => {
    messaging()
      .hasPermission()
      .then((status) => {
        setIsChecking(false);
        updateAuthorizationStatus(status);
      });
  }, [updateAuthorizationStatus]);

  useEffect(() => {
    if (didAppCameToForeground) {
      messaging()
        .hasPermission()
        .then((status) => {
          updateAuthorizationStatus(status);
        });
    }
  }, [didAppCameToForeground, updateAuthorizationStatus]);

  return {
    isChecking,
  };
}

export function usePermissions() {
  const status = useRecoilValue(authorizationStatusState);
  const permission = useRecoilValue(permissionState);

  return {
    isPermissionDenied: isPermissionDenied(status),
    isPermissionGranted: isPermissionGranted(status),
    isPermissionNotDetermined: isPermissionNotDetermined(status),
    isPermissionPromptNeeded: !permission.isSkipped && isPermissionNotDetermined(status),
  };
}
