import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import type {AccountId, CoreAssignment, ParaValidatorIndex} from '@polkadot/types/interfaces';

export function useParachainValidators() {
  return useApiQuery('parachain_validators', async (api: ApiPromise) => {
    const scheduler = api.query.parasScheduler || api.query.paraScheduler || api.query.scheduler;
    const shared = api.query.parasShared || api.query.paraShared || api.query.shared;

    const [validators, assignments, validatorGroups, validatorIndices] = await Promise.all([
      api.query.session.validators<AccountId[]>(),
      scheduler?.scheduled?.<CoreAssignment[]>(),
      scheduler?.validatorGroups?.() as unknown as ParaValidatorIndex[][],
      shared?.activeValidatorIndices?.<ParaValidatorIndex[]>(),
    ]);

    return {
      validators,
      assignments,
      validatorGroups,
      validatorIndices,
    };
  });
}
