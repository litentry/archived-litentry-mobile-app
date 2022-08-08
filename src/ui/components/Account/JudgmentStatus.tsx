import React from 'react';
import {Icon, Popover} from '@ui/library';
import {mapStatusText} from 'src/utils/identity';
import {colorGreen, colorRed, colorGray} from '@ui/styles';
import type {RegistrationJudgment} from 'src/api/hooks/useAccount';

type Props = {
  registrationJudgement: RegistrationJudgment;
  hasParent: boolean;
};

export function JudgmentStatus({registrationJudgement, hasParent}: Props) {
  if (!registrationJudgement.judgement) {
    return null;
  }

  const status = mapStatusText(registrationJudgement.judgement, hasParent);

  return (
    <Popover content={`"${status.text}" provided by Registrar #${registrationJudgement.registrarIndex}`}>
      <Icon name={status.icon} size={20} color={getIconColor(status.category)} />
    </Popover>
  );
}

function getIconColor(status: string) {
  if (status === 'good') {
    return colorGreen;
  } else if (status === 'bad') {
    return colorRed;
  }
  return colorGray;
}
