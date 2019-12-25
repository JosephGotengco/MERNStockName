// root reducer
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import graphReducer from "./graphReducer";
import tradingReducer from "./tradingReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  graph: graphReducer,
  trading: tradingReducer,
  sidebar: sidebarReducer
});
