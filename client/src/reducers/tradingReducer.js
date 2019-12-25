import { SET_TRADE_MSG, TRADE_ERROR, TRADE_SUCCESS, SET_ESTIMATED_PRICE, CLEAR_TRADE_ERROR } from "../actions/types";

const initialState = {
  tradeError: false,
  tradeMsg: "",
  estimatedPrice: 0.00
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_TRADE_ERROR:
      return {
        ...state,
        tradeError: false,
        tradeMsg: ""
      }
    case TRADE_SUCCESS:
      return {
        ...state,
        tradeError: false,
        tradeMsg: action.payload
      }
    case TRADE_ERROR:
      return {
        ...state,
        tradeError: true,
        tradeMsg: action.payload
      }
    case SET_TRADE_MSG:
      return {
        ...state,
        tradeMsg: action.payload
      }
    case SET_ESTIMATED_PRICE:
      return {
        ...state,
        estimatedPrice: action.payload
      }
    default:
      return state;
  }
}
