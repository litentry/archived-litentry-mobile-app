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

describe('JudgmentStatus', () => {
  it('should render the JudgmentStatus component with data', async () => {
    const {findByText} = render(<JudgmentStatus registrationJudgement={judgements} hasParent={false} />);
    await findByText('"Reasonable" provided by Registrar #1');
  });
});
