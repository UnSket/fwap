import { User } from '../../model/types/User';

export type State = {
  loading: boolean,
  user: User | null,
  error?: string
};
