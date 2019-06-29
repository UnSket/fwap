import { createActions } from 'redux-actions';

const LOADING_STARTED = 'LOADING_STARTED';
const LOADING_END = 'LOADING_END';

export const {loadingStarted, loadingEnd} = createActions({
    LOADING_STARTED: () => ({ loading: true }),
    LOADING_END: () => ({ loading: false })
});
