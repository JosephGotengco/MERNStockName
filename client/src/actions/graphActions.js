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

// iex cloud api constants
const baseURL = "https://cloud.iexapis.com";
const apiToken = "pk_5187144627fe41f783caf3f0341d7f3e";

// Get graph data form iex cloud api
export const getGraphData = (ticker, graphPeriod) => dispatch => {
  dispatch({ type: LOADING_GRAPH_DATA });

  let graphLabels = [];
  let graphData = [];
  let graphTitle = `${ticker} Price`;

  axios
    .get(
      `${baseURL}/stable/stock/${ticker}/chart/${graphPeriod}?token=${apiToken}`
    )
    .then(
      res => {
        res.data.map(dataPoint => {
          let label = dataPoint.label.split(' ');
          let temp = label[0];
          label[0] = label[1];
          label[1] = temp;
          let newLabel = label.join(' ');
          graphLabels.push(newLabel);
          graphData.push(dataPoint.close);
          return null;
        });

        let currentPrice = graphData[graphData.length - 1];

        dispatch({
          type: LOADED_GRAPH_DATA,
          payload: {
            ticker,
            graphLabels,
            graphData,
            graphTitle,
            currentPrice
          }
        });
      },
      err => {
        dispatch({ type: GRAPH_DATA_ERROR });
      }
    );
};

export const changeGraphType = graphType => dispatch => {
  dispatch({ type: RETURN_GRAPH_TYPE, payload: graphType });
};

export const changeGraphPeriod = graphPeriod => dispatch => {
  dispatch({ type: RETURN_GRAPH_PERIOD, payload: graphPeriod });
};

export const handleTickerSearch = ticker => {
  return (dispatch, getState) => {
    if (!ticker) {
      dispatch({
        type: GRAPH_ERROR,
        payload: `Search bar is blank`
      });
      return new Promise((resolve, reject) => {})

    } else {
      dispatch({ type: LOADING_GRAPH_DATA });

      const { graphPeriod } = getState().graph;

      return Promise.all([
        axios.get(
          `${baseURL}/stable/stock/${ticker}/chart/${graphPeriod}?token=${apiToken}`
        ),
        axios.get(
          `${baseURL}/stable/stock/${ticker}/stats/beta?token=${apiToken}`
        ),
        axios.get(`${baseURL}/stable/stock/${ticker}/quote?token=${apiToken}`)
      ]).then(
        res => {
          // Graph
          let graphLabels = [];
          let graphData = [];
          let graphTitle = `${ticker} Price`;

          // res 0 - graph data
          res[0].data.map(dataPoint => {
            let label = dataPoint.label.split(' ');
            if (label[1].length === 1) {
              label[1] = '0' + label[1];
            }
            let newLabel = label.join(' ');
            graphLabels.push(newLabel);
            graphData.push(dataPoint.close);
            return null;
          });

          let currentPrice = graphData[graphData.length - 1];

          // res 1 - beta
          let beta = res[1];

          // res 2 - companyName, peRatio, ohlc, change
          let {
            companyName,
            peRatio,
            open,
            high,
            low,
            close,
            change,
            changePercent
          } = res[2].data;
          dispatch({ type: CLEAR_SEARCH_ERROR });
          dispatch({
            type: LOADED_GRAPH_DATA,
            payload: {
              ticker,
              graphLabels,
              graphData,
              graphTitle,
              currentPrice,
              beta,
              companyName,
              peRatio,
              open,
              high,
              low,
              close,
              change,
              changePercent
            }
          });
        },
        err => {
          if (err.response.status === 404) {
            dispatch({
              type: GRAPH_ERROR,
              payload: `${ticker} is not a valid ticker`
            });
          }
        }
      );
    }
  }
};
