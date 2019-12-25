import axios from "axios";
import { TRADE_ERROR, SET_TRADE_MSG, TRADE_SUCCESS, SET_ESTIMATED_PRICE, CLEAR_TRADE_ERROR, SET_USER_STOCKS, SET_USER_BAL } from "./types";



export const handleTrade = (ticker, prices, qty, orderType) => {
  return (dispatch, getState) => {
    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    console.log('TRADE DATA', ticker, prices, qty, orderType)

    // Request body
    const body = JSON.stringify({
      ticker,
      prices,
      qty,
      orderType
    });

    return axios
      .post("/api/trade", body, config)
      .then(res => {
        console.log(res.data);
        let { stocks, balance } = res.data;
        dispatch({ type: SET_USER_STOCKS, payload: stocks });
        dispatch({ type: SET_USER_BAL, payload: balance });
        dispatch({ type: TRADE_SUCCESS, payload: res.data.msg });
      })
      .catch(e => {
        console.log(e)
        dispatch({ type: TRADE_ERROR, payload: e.response.data.msg });
        dispatch({ type: SET_TRADE_MSG, payload: e.response.data.msg });
      })
  }
};


export const getStockPrice = ticker => {
  return (dispatch, getState) => {
    return axios
      .get(`https://cloud.iexapis.com/stable/stock/${ticker}/previous?token=pk_5187144627fe41f783caf3f0341d7f3e`)
      .then(res => {
        let closingPrice = res.data.close;
        dispatch({ type: CLEAR_TRADE_ERROR })
        dispatch({ type: SET_ESTIMATED_PRICE, payload: closingPrice });
      })
      .catch(e => {
        if (e.response.status === 404) {
          dispatch({ type: TRADE_ERROR, payload: "Invalid ticker." });
        }
      })
  }
}