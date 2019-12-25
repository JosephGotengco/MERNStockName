import React, { Component } from 'react';
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { handleTrade, getStockPrice } from "./../../../actions/tradingActions";
import Swal from 'sweetalert2'
import {
    fieldLabel, tradeHeader, fieldRow,
    fieldInput, submitRow, submitButton,
    confirmWrapper, confirmTitle, confirmSubText,
    confirmDescWrapper, confirmDescTitle, confrimDescRow,
    confirmDescText, buttonRow, cancelButton, purchaseButton
} from "./../tradingForm.module.css";
class TradeSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '1',
            qty: '1',
            orderType: 'market',
            ticker: 'TSLA'
        }
    }

    orderTypes = [
        { type: "Market Order", val: "market" },
        { type: "Limit Order", val: "limit" },
        { type: "Stop Order", val: "stop" },
        { type: "Buy-Stop Order", val: "buy-stop" }
    ];

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }


    onConfirmTrade = () => {
        let { price, qty, orderType, ticker } = this.state;
        if (!ticker) {
            Swal.fire(
                'Error!',
                `Ticker field is blank.`,
                'error'
            )
        } else if (!Number.isInteger(parseInt(qty))) {
            Swal.fire(
                'Error!',
                `Amount must be a whole number.`,
                'error'
            )
        } else {
            this.props.getStockPrice(ticker)
                .then(() => {
                    if (this.props.tradeError) {
                        Swal.fire(
                            'Error!',
                            `${this.props.tradeMsg}`,
                            'error'
                        )
                    } else {
                        this.toggle();
                    }
                });
        }
    }

    onTrade = () => {
        let { ticker, price, qty, orderType } = this.state;
        this.props.handleTrade(ticker, price, qty, orderType)
            .then(() => {
                if (this.props.tradeError) {
                    Swal.fire(
                        'Error!',
                        `${this.props.tradeMsg}`,
                        'error'
                    )
                } else {
                    this.toggle();
                    Swal.fire(
                        'Purchase Complete!',
                        `${this.props.tradeMsg}`,
                        'success'
                    )
                }
            });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        let { ticker, price, orderType, qty } = this.state;
        let { estimatedCost } = this.props;
        return (
            <div>
                <div className={tradeHeader}>Buy</div>
                <div className={fieldRow}>
                    <div className={fieldLabel}>Ticker</div>
                    <div><input className={fieldInput} value={this.state.ticker.toUpperCase()}
                        onChange={evt => this.handleChange(evt)} name={"ticker"} placeholder="TSLA" /></div>
                </div>
                <div className={fieldRow}>
                    <div className={fieldLabel}>Amount</div>
                    <div><input className={fieldInput} value={this.state.qty}
                        onChange={evt => this.handleChange(evt)} name={"qty"} /></div>
                </div>
                <div className={submitRow}>
                    <div className={submitButton} onClick={this.onConfirmTrade}>Buy</div>
                </div>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="modal-md"
                >
                    <ModalBody className={confirmWrapper}>
                        <div className={confirmTitle}>Confirm Order</div>
                        <div className={confirmSubText}>Would you like to place the following order(s)?</div>
                        <div className={confirmDescWrapper}>
                            <div className={confirmDescTitle}>
                                Buy {qty} {ticker.toUpperCase()} @ {estimatedCost} {orderType}
                            </div>
                            <div className={confrimDescRow}>
                                <div>Order Type:</div>
                                <div className={confirmDescText}>{orderType.charAt(0).toUpperCase() + orderType.substring(1)}</div>
                            </div>
                            <div className={confrimDescRow}>
                                <div>Ticker:</div>
                                <div className={confirmDescText}>{ticker}</div>
                            </div>
                            <div className={confrimDescRow}>
                                <div>Amount:</div>
                                <div className={confirmDescText}>{qty}</div>
                            </div>
                            <div className={confrimDescRow}>
                                <div>Estimated Cost:</div>
                                <div className={confirmDescText}>{estimatedCost}</div>
                            </div>
                        </div>
                        <div className={buttonRow}>
                            <div className={cancelButton} onClick={this.toggle}>Cancel</div>
                            <div className={purchaseButton} onClick={this.onTrade}>Purchase</div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tradeError: state.trading.tradeError,
    tradeMsg: state.trading.tradeMsg,
    estimatedCost: state.trading.estimatedPrice
});

export default connect(mapStateToProps, { handleTrade, getStockPrice })(TradeSection)