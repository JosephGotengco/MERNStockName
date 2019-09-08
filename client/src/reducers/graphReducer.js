import {
  LOADING_GRAPH_DATA,
  LOADED_GRAPH_DATA,
  GRAPH_DATA_ERROR,
  RETURN_GRAPH_TYPE,
  RETURN_GRAPH_PERIOD,
  GRAPH_ERROR,
  CLEAR_SEARCH_ERROR
} from "../actions/types";

const initialState = {
  graphLoading: null,
  ticker: "",
  labels: [],
  data: [],
  graphTitle: "",
  rate: 1.0,
  graphErrorMsg: null,
  graphType: "line",
  graphPeriod: "1m",
  graphError: "",
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  beta: 0,
  peRatio: 0,
  change: 0,
  changePercent: 0,
  companyName: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_GRAPH_DATA:
      return {
        ...state,
        ticker: action.payload,
        graphLoading: true
      };
    case LOADED_GRAPH_DATA:
      return {
        ...state,
        graphLoading: false,
        ...action.payload
      };
    case GRAPH_DATA_ERROR:
      return {
        ...state,
        graphLoading: false,
        graphErrorMsg: action.paylaod
      };
    case RETURN_GRAPH_TYPE:
      return {
        ...state,
        graphType: action.payload
      };
    case RETURN_GRAPH_PERIOD:
      return {
        ...state,
        graphPeriod: action.payload
      };
    case GRAPH_ERROR:
      return {
        ...state,
        graphError: action.payload
      };
    case CLEAR_SEARCH_ERROR:
      return {
        ...state,
        graphError: ""
      };
    default:
      return state;
  }
}
