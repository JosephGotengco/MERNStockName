import axios from "axios";

import {
  LOADING_GRAPH_DATA,
  LOADED_GRAPH_DATA,
  GRAPH_DATA_ERROR,
  RETURN_GRAPH_TYPE,
  RETURN_GRAPH_PERIOD,
  GRAPH_ERROR,
  CLEAR_SEARCH_ERROR
} from "./types";

export const handleTrade = (ticker, prices, shares, orderType) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    ticker,
    prices,
    shares,
    orderType
  });

  axios.post("/api/trade", body, config).then(res => console.log(res.data));
};
