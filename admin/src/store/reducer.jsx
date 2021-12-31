import { LOGIN } from './constants';
import { CheckToken } from '../Helper/HandleToken';

const initState = {
    login: CheckToken(),
};

function reducer(state, action) {
    console.log(state);
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: action.payload,
            };

        default:
            throw new Error('Invalid action.');
    }
}

export { initState };
export default reducer;
