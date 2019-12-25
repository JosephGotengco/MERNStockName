import {
    TOGGLE_SIDEBAR
} from "./types";

export const toggleSidebar = () => dispatch => {
    console.log('sidebar toggle')
    dispatch({ type: TOGGLE_SIDEBAR });
}