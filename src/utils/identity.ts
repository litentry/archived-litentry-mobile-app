import {IdentityJudgement} from '@polkadot/types/interfaces';

export const mapStatusText = (judgement: IdentityJudgement, hasParent: boolean) => {
  if (judgement.isErroneous) {
    return {text: 'Erroneous', category: 'bad', icon: 'alert-circle-outline'};
  }

  // if (judgement.isFeePaid) {
  //   return {text: 'Fee Paid', category: 'pending'};
  // }
  //
  // if (judgement.asFeePaid) {
  //   return {text: 'Pending', category: 'pending'};
  // }

  if (judgement.isReasonable) {
    return {text: 'Reasonable', category: 'good', icon: hasParent ? 'link' : 'check-circle'};
  }

  if (judgement.isKnownGood) {
    return {text: 'Known Good', category: 'good', icon: hasParent ? 'link' : 'check-circle'};
  }

  if (judgement.isOutOfDate) {
    return {text: 'Out of Date', category: 'bad', icon: 'alert-circle'};
  }

  if (judgement.isLowQuality) {
    return {text: 'Low Quality', category: 'bad', icon: 'alert-circle'};
  }

  return {text: 'Unknown', category: 'neutral', icon: 'help-circle'};
};
