import React, { Component } from "react";
import SearchBar from "./SearchBar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  title,
  closePrice,
  changesPos,
  changesNeg
} from "../styles.module.css";

class Overview extends Component {
  state = {};

  static propTypes = {
    companyName: PropTypes.string,
    ticker: PropTypes.string,
    close: PropTypes.number,
    change: PropTypes.number,
    changePercent: PropTypes.number,
    graphError: PropTypes.string
  };

  render() {
    const {
      companyName,
      ticker,
      close,
      change,
      changePercent,
      graphError
    } = this.props;

    const overview = (
      <div className="d-flex mt-2 pl-2 pr-3">
        <div className={title + " mr-auto"}>
          {companyName} {ticker ? "(" + ticker + ")" : null}
        </div>
        <div className="d-flex flex-column text-right">
          <div className={closePrice}>{close ? "$" + close : null}</div>
          <div className={change > 0 ? changesPos : changesNeg}>
            {!change ? null : change.toFixed(2)}{" "}
            {!changePercent ? null : "(" + changePercent.toFixed(2) + "%)"}
          </div>
        </div>
      </div>
    );

    const error = <div className="mt-2 text-danger">{graphError}</div>;

    return (
      <div>
        <SearchBar />
        {!graphError ? overview : error}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyName: state.trading.companyName,
  ticker: state.trading.ticker,
  close: state.trading.close,
  change: state.trading.change,
  changePercent: state.trading.changePercent,
  graphError: state.trading.graphError
});

export default connect(
  mapStateToProps,
  null
)(Overview);
