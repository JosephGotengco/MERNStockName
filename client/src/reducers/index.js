// root reducer
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import tradingReducer from './tradingReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    trading: tradingReducer
});
