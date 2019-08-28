import {
    USERS_LOADING,
    USERS_LOADED
} from '../actions/types';

const initialState = {
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USERS_LOADING:
            return {
                ...state
            }
        case USERS_LOADED:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}