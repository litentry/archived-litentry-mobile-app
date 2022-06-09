import React from 'react';
import {render} from 'src/testUtils';
import {JudgmentStatus} from './JudgmentStatus';

const judgements = {
  registrarIndex: 1,
  judgement: {
    isUnknown: false,
    isFeePaid: false,
    isReasonable: true,
    isKnownGood: false,
    isOutOfDate: false,
    isLowQuality: false,
    isErroneous: false,
  },
};

test('render the component with data', () => {
  const {getByText} = render(<JudgmentStatus registrationJudgement={judgements} hasParent={false} />);
  expect(getByText('"Reasonable" provided by Registrar #1')).toBeTruthy();
});
