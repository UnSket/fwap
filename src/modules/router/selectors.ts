import { Store } from '../../model/types/Store';

export const currentLocation = (store: Store) => store.router.location;