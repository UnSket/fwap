import { User } from '../../model/types/User';

export type State = {
  loading: boolean,
  users: User[],
  error?: string | null,
  page: number,
  last: boolean
};
