import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import SpinLoadAnimation from "./SpinLoadAnimation";

import { handleTrade } from "../../../actions/tradingActions";

import { connect } from "react-redux";

import "./../modal.css";
import axios from "axios";

class ConfirmTradeModal extends Component {
  state = {
    modal: false,
    costPerTicker: 0
  };

  componentDidUpdate(prevProps) {
    const { ticker } = this.props;
    if (prevProps.ticker !== ticker) {

      const baseURL = "https://cloud.iexapis.com";
      const apiToken = "pk_5187144627fe41f783caf3f0341d7f3e";

      if (ticker) {
        axios
          .get(`${baseURL}/stable/stock/${ticker}/previous?token=${apiToken}`)
          .then(
            res => {
              this.setState({
                costPerTicker: res.data.close
              });
            },
            err => {
              console.log(err);
            }
          );
      }
    }

  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onTrade = () => {
    const { ticker, prices, qty, orderType } = this.props;
    this.props.handleTrade(ticker, prices, qty, orderType);
  };

  render() {
    const { ticker, orderType, qty, price, buttonClass } = this.props;
    const { costPerTicker } = this.state;

    const priceLine = (
      <div style={{ overflowX: "hidden" }}>
        <span className="label">Price</span>
        <span className="data">{price}</span>
      </div>
    );

    return (
      <div>
        <button
          className={buttonClass}
          onClick={!this.props.isReady() ? null : this.toggle}
        >
          Order
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          {this.props.processingTrade ? (
            <div className="overlay">
              <SpinLoadAnimation />
            </div>
          ) : null}
          <ModalHeader toggle={this.toggle}>Confirm Your Order</ModalHeader>
          <ModalBody>
            {/* <h3>Details</h3> */}
            <div style={{ overflowX: "hidden" }}>
              <span className="label">Ticker</span>
              <span className="data">{ticker}</span>
            </div>
            <div style={{ overflowX: "hidden" }}>
              <span className="label">Order Type</span>
              <span className="data">{orderType}</span>
            </div>
            <div style={{ overflowX: "hidden" }}>
              <span className="label">Quantity</span>
              <span className="data">{qty}</span>
            </div>
            {price ? priceLine : null}

            <div className="total-wrapper">
              <span className="total-label">Total</span>$
              {qty * costPerTicker}
            </div>

            <div className="button-wrapper">
              <button className="confirm-button" onClick={this.onTrade}>
                Confirm Order
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processingTrade: state.trading.processingTrade
});

export default connect(
  mapStateToProps,
  { handleTrade }
)(ConfirmTradeModal);
