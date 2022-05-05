import {SubstrateChainIdentityJudgement as IdentityJudgement} from 'src/generated/litentryGraphQLTypes';
import {mapStatusText} from './identity';

test('isErroneous test case', () => {
  const isErroneousJudgement: IdentityJudgement = {
    isErroneous: true,
    isReasonable: false,
    isKnownGood: false,
    isOutOfDate: false,
    isLowQuality: false,
  };
  const expectedJudgement = {text: 'Erroneous', category: 'bad', icon: 'alert-circle-outline'};

  const mapStatus = mapStatusText(isErroneousJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatus_hasParent = mapStatusText(isErroneousJudgement, true);
  expect(mapStatus_hasParent).toEqual(expectedJudgement);
});

test('isReasonable test case', () => {
  const isReasonableJudgement: IdentityJudgement = {
    isErroneous: false,
    isReasonable: true,
    isKnownGood: false,
    isOutOfDate: false,
    isLowQuality: false,
  };
  const expectedJudgement = {text: 'Reasonable', category: 'good', icon: 'check-circle'};

  const expectedJudgement_hasParent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isReasonableJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatus_hasParent = mapStatusText(isReasonableJudgement, true);
  expect(mapStatus_hasParent).toEqual(expectedJudgement_hasParent);
});

test('isKnownGood test case', () => {
  const isKnownGoodJudgement: IdentityJudgement = {
    isErroneous: false,
    isReasonable: true,
    isKnownGood: false,
    isOutOfDate: false,
    isLowQuality: false,
  };
  const expectedJudgement = {text: 'Reasonable', category: 'good', icon: 'check-circle'};

  const expectedJudgement_hasParent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isKnownGoodJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatus_hasParent = mapStatusText(isKnownGoodJudgement, true);
  expect(mapStatus_hasParent).toEqual(expectedJudgement_hasParent);
});

test('isOutOfDate test case', () => {
  const isOutOfDateJudgement: IdentityJudgement = {
    isErroneous: false,
    isReasonable: true,
    isKnownGood: false,
    isOutOfDate: false,
    isLowQuality: false,
  };
  const expectedJudgement = {text: 'Reasonable', category: 'good', icon: 'check-circle'};

  const expectedJudgement_parent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isOutOfDateJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatus_hasParent = mapStatusText(isOutOfDateJudgement, true);
  expect(mapStatus_hasParent).toEqual(expectedJudgement_parent);
});

test('isLowQuality test case', () => {
  const isLowQualityJudgement: IdentityJudgement = {
    isErroneous: false,
    isReasonable: true,
    isKnownGood: false,
    isOutOfDate: false,
    isLowQuality: false,
  };
  const expectedJudgement = {text: 'Reasonable', category: 'good', icon: 'check-circle'};

  const expectedJudgement_hasParent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isLowQualityJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatus_hasParent = mapStatusText(isLowQualityJudgement, true);
  expect(mapStatus_hasParent).toEqual(expectedJudgement_hasParent);
});
