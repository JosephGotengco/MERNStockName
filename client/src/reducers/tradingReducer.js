import {
  PROCESSING_PURCHASE,
  PROCESSED_PURCHASE,
  PURCHASE_SUCCESSFUL,
  PURCHASE_ERROR
} from "../actions/types";

const initialState = {
  processingTrade: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROCESSING_PURCHASE:
      return {
        ...state,
        processingTrade: true
      };
    case PROCESSED_PURCHASE:
      return {
        ...state,
        processingTrade: false
      };
    case PURCHASE_SUCCESSFUL:
      var { ticker, qty, balance, msg } = action.payload;
      return {
        ...state
      };
    case PURCHASE_ERROR:
      var { msg } = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}
