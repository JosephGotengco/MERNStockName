import {
    TOGGLE_SIDEBAR
} from "./../actions/types";

const initialState = {
    toggled: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                toggled: !state.toggled
            }
        default:
            return state;
    }
}