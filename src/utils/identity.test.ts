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

  const mapStatusHasParent = mapStatusText(isErroneousJudgement, true);
  expect(mapStatusHasParent).toEqual(expectedJudgement);
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

  const expectedJudgementHasParent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isReasonableJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatusHasParent = mapStatusText(isReasonableJudgement, true);
  expect(mapStatusHasParent).toEqual(expectedJudgementHasParent);
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

  const expectedJudgementHasParent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isKnownGoodJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatusHasParent = mapStatusText(isKnownGoodJudgement, true);
  expect(mapStatusHasParent).toEqual(expectedJudgementHasParent);
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

  const expectedJudgementParent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isOutOfDateJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatusHasParent = mapStatusText(isOutOfDateJudgement, true);
  expect(mapStatusHasParent).toEqual(expectedJudgementParent);
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

  const expectedJudgementHasParent = {text: 'Reasonable', category: 'good', icon: 'link'};

  const mapStatus = mapStatusText(isLowQualityJudgement, false);
  expect(mapStatus).toEqual(expectedJudgement);

  const mapStatusHasParent = mapStatusText(isLowQualityJudgement, true);
  expect(mapStatusHasParent).toEqual(expectedJudgementHasParent);
});
