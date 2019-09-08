// root reducer
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import graphReducer from "./tradingReducer";
import tradingReducer from "./graphReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  graph: graphReducer,
  trading: tradingReducer
});
