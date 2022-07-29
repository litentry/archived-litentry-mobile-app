import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, SharedValue, withTiming} from 'react-native-reanimated';
import {useTheme, Icon} from '@ui/library';

export enum WizardStep {
  RequestPermission = 1,
  RequestTransfer = 2,
  Completed = 3,
}

type WizardState = SharedValue<Record<WizardStep, {active: boolean; done?: boolean}>>;

export const wizardInitialState = {
  [WizardStep.RequestPermission]: {
    active: true,
    done: false,
  },
  [WizardStep.RequestTransfer]: {
    active: false,
    done: false,
  },
  [WizardStep.Completed]: {
    active: false,
  },
};

export function useTransactionWizard() {
  const initialStep = WizardStep.RequestPermission;
  const [currentStep, setCurrentStep] = React.useState<WizardStep>(initialStep);
  const wizardState = useSharedValue(wizardInitialState);

  const nextStep = React.useCallback(
    (_nextStep?: WizardStep) => {
      if (_nextStep === WizardStep.RequestTransfer) {
        setCurrentStep(WizardStep.RequestTransfer);
        wizardState.value = {
          ...wizardState.value,
          [WizardStep.RequestPermission]: {
            active: false,
            done: true,
          },
          [WizardStep.RequestTransfer]: {
            active: true,
            done: false,
          },
        };
      }
      if (_nextStep === WizardStep.Completed) {
        setCurrentStep(WizardStep.Completed);
        wizardState.value = {
          ...wizardState.value,
          [WizardStep.RequestTransfer]: {
            active: false,
            done: true,
          },
          [WizardStep.Completed]: {
            active: true,
          },
        };
      }
    },
    [wizardState],
  );

  const resetWizard = React.useCallback(() => {
    setCurrentStep(WizardStep.RequestPermission);
    wizardState.value = wizardInitialState;
  }, [wizardState]);

  const TransactionWizard = React.useCallback(() => {
    return (
      <View style={styles.wizardContainer}>
        <Step step={1} state={wizardState} />
        <WizardStepDivider />
        <Step step={2} state={wizardState} />
        <WizardStepDivider />
        <Step step={3} state={wizardState} />
      </View>
    );
  }, [wizardState]);

  return {TransactionWizard, nextStep, currentStep, resetWizard};
}

function Step({step, state}: {step: WizardStep; state: WizardState}) {
  const {colors} = useTheme();
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(state.value[step].active || state.value[step].done ? colors.surface : colors.secondary),
    };
  });
  const animatedCircleStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        state.value[step].active || state.value[step].done ? colors.secondary : colors.background,
      ),
    };
  });

  return (
    <Animated.View style={[styles.stepContainer, {borderColor: colors.secondary}, animatedCircleStyles]}>
      {step === WizardStep.Completed ? (
        <Icon
          name="check"
          size={18}
          color={state.value[WizardStep.Completed].active ? colors.surface : colors.secondary}
        />
      ) : state.value[step].done ? (
        <Icon name="check" size={18} color={colors.surface} />
      ) : (
        <Animated.Text style={[styles.stepText, animatedTextStyle]}>{step}</Animated.Text>
      )}
    </Animated.View>
  );
}

function WizardStepDivider() {
  const {colors} = useTheme();

  return <View style={[styles.wizardDivider, [{backgroundColor: colors.secondaryContainer}]]} />;
}

const styles = StyleSheet.create({
  wizardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stepContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {fontWeight: '700'},
  wizardDivider: {
    height: 1,
    width: '30%',
  },
});
