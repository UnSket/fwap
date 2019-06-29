import { createActions } from 'redux-actions';


export const { loadingStarted, loadingEnd } = createActions({
    'LOADING_STARTED': () => ({ loading: true }),
    'LOADING_END': () => ({ loading: false })
});
