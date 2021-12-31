import { LOGIN } from './constants';

export const setLogin = (payload) => ({
    type: LOGIN,
    payload,
});
