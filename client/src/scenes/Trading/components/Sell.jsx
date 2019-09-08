import React, { Component } from "react";
import { connect } from "react-redux";
import SellModal from "./SellModal";
import axios from 'axios';
import "../table.css";


class Sell extends Component {
  state = {
    stocks: [],
    prices: [],
    watchlist: []
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.stocks !== this.props.stocks) {
      const { stocks, watchlist } = this.props;
      let tickers = '';
      for (let i = 0; i < stocks.length; i++) {
        tickers += `${stocks[i].ticker} `;
      }
      let response = await axios.get(`https://cloud.iexapis.com/stable/tops/last?symbols=${tickers}&token=pk_5187144627fe41f783caf3f0341d7f3e`)
      let prices = response.data.map((val) => {return val.price});
      console.log(prices);
      this.setState({
        stocks,
        watchlist,
        prices
      });
    }
  }

  render() {
    const { stocks, prices, watchlist } = this.state;
    return (
      <div className="w-100 h-100 table-wrapper">
        <div className="title-row">
          <div className="title-text">Your Stocks</div>
        </div>
        <div className="header-row">
          <div className="header-text">Ticker</div>
          <div className="header-text">Amount</div>
          <div className="header-text">Current Price</div>
          <div className="header-text"></div>
        </div>
        {stocks.map((stock, i) => {
          return (
            <div className="table-row" key={i}>
              <div className="data-row">
                <div className="table-col">{stock.ticker.toUpperCase()}</div>
                <div className="table-col">{stock.qty}</div>
                <div className="table-col">${prices[i]}</div>
                <div className="table-col btn-col"><SellModal/></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.auth.stocks
});

export default connect(
  mapStateToProps,
  null
)(Sell);
