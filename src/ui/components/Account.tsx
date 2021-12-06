import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';

export function Account({id, children}: {id: string; children: (info?: IdentityInfo) => JSX.Element}) {
  const {data: identity} = useAccountIdentityInfo(id);

  return children(identity);
}
