import React, { Component } from "react";
import Search from "@material-ui/icons/Search";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { Row, Col } from "reactstrap";
import ConfirmTradeModal from "./ConfirmTradeModal";

import { handleTrade } from "../../../actions/tradingActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  tradeField,
  title,
  noAppearance,
  incrementButton,
  decrementButton,
  rightIcon,
  tradeFieldWrapper,
  submitButton,
  available
} from "../styles.module.css";

class Trade extends Component {
  state = {
    orderType: "",
    ticker: "",
    qty: "",
    price: ""
  };

  static propTypes = {
    handleTrade: PropTypes.func.isRequired
  };

  orderTypes = [
    { type: "Market Order", val: "market" },
    { type: "Limit Order", val: "limit" },
    { type: "Stop Order", val: "stop" },
    { type: "Buy-Stop Order", val: "buy-stop" }
  ];

  onChange = e => {
    const { name, value } = e.target;
    // validation for qty
    this.setState({ [name]: value });
    if (name === "qty" || name === "price") {
      const elseVal = this.state[name] === "0.00" ? "" : this.state[name];
      const value = e.target.validity.valid ? e.target.value : elseVal;
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleIncrement = e => {
    const name = e.target.getAttribute("name");
    const currVal = this.state[name];
    if (name === "qty") {
      const newVal = currVal === "" ? 1 : parseInt(currVal) + 1;
      this.setState({ [name]: newVal });
    } else {
      const newVal =
        currVal === "" ? "1.00" : (parseFloat(currVal) + 1).toFixed(2);
      this.setState({ [name]: newVal });
    }
  };

  handleDecrement = e => {
    const name = e.target.getAttribute("name");
    const currVal = this.state[name];
    if (name === "qty") {
      const newVal = currVal === 0 || currVal - 1 <= 0 ? "" : currVal - 1;
      this.setState({ [name]: newVal });
    } else {
      const newVal =
        currVal === "" || parseFloat(currVal) - 1 <= 0
          ? ""
          : (parseFloat(currVal) - 1).toFixed(2);
      this.setState({ [name]: newVal });
    }
  };

  orderCheck = () => {
    const { ticker, qty, price, orderType } = this.state;
    if (ticker === "" || qty === "") {
      return false;
    } else if (orderType !== "market" && price === "") {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { ticker, qty, price, orderType } = this.state;

    return (
      <div className="w-100 h-100">
        <Row  className="m-0">
          <div className={title} style={{borderBottom: "2px solid #EEEEEE", padding: "1rem 0" }}>Buy</div>
        </Row>
        <Row>
          <Col className="d-flex mt-5">
            <div
              className={
                noAppearance +
                " " +
                tradeFieldWrapper +
                " position-relative d-inline mx-auto tradeFieldWrapper"
              }
            >
              <select
                className={tradeField}
                id="orderType"
                name="orderType"
                value={orderType}
                onChange={this.onChange}
                required
              >
                <option key="" value="" disabled hidden />
                {this.orderTypes.map(option => (
                  <option key={option.val} value={option.val}>
                    {option.type}
                  </option>
                ))}
              </select>
              <label className="position-absolute" htmlFor="orderType">
                Order Type
              </label>
              <ExpandMore className={rightIcon + " position-absolute"} />
            </div>
          </Col>
          <Col className="d-flex mt-5">
            <div
              className={
                tradeFieldWrapper + " position-relative d-inline mx-auto"
              }
            >
              <input
                className={tradeField}
                onChange={this.onChange}
                name="ticker"
                value={ticker}
                required
              />
              <label className="position-absolute" htmlFor="ticker">
                Ticker
              </label>
              <Search className={rightIcon + " position-absolute"} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex mt-5">
            <div
              className={
                noAppearance +
                " " +
                tradeFieldWrapper +
                " position-relative d-inline mx-auto"
              }
            >
              <input
                className={tradeField}
                onChange={this.onChange}
                name="qty"
                type="number"
                pattern="^[1-9][0-9]*"
                min="0"
                value={qty}
                required
              />
              <label className="position-absolute" htmlFor="qty">
                qty
              </label>
              <ExpandLess
                className={incrementButton + " position-absolute"}
                name="qty"
                onClick={this.handleIncrement.bind(this)}
              />
              <ExpandMore
                className={decrementButton + " position-absolute"}
                name="qty"
                onClick={this.handleDecrement.bind(this)}
              />
            </div>
          </Col>
          <Col className="d-flex mt-5">
            <div
              className={
                noAppearance +
                " " +
                tradeFieldWrapper +
                " position-relative d-inline mx-auto"
              }
            >
              <input
                className={tradeField}
                onChange={this.onChange}
                name="price"
                type="number"
                pattern="^[1-9][0-9.]*"
                min="0.00"
                step="0.01"
                value={ ( orderType === 'market') ? '' : price }
                disabled={ ( orderType === 'market' ) ? true : false }
                required
              />
              <label className="position-absolute" htmlFor="price">
                Price (USD)
              </label>
              <ExpandLess
                className={incrementButton + " position-absolute"}
                name="price"
                onClick={ ( orderType === 'market' ) ? null : this.handleIncrement.bind(this)}
              />
              <ExpandMore
                className={decrementButton + " position-absolute"}
                name="price"
                onClick={ ( orderType === 'market' ) ? null : this.handleDecrement.bind(this)}
              />
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <ConfirmTradeModal
            ticker={ticker}
            orderType={orderType}
            qty={qty}
            price={price}
            isReady={this.orderCheck}
            buttonClass={
              this.orderCheck() ? submitButton + " " + available : submitButton
            }
          />
        </Row>
      </div>
    );
  }
}


export default connect(
  null,
  { handleTrade }
)(Trade);
