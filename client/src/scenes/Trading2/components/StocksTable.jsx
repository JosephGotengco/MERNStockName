import React, { Component } from 'react';
import { connect } from "react-redux";
import { getStockPrice, handleSale } from "./../../../actions/tradingActions";
import { Modal, ModalBody } from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2'
import { tableRow, tableCol, title, headerRow, sellButton } from "./../table.module.css";
import {
    confirmWrapper, confirmTitle, confirmSubText,
    confirmDescWrapper, confirmDescTitle, confrimDescRow,
    confirmDescText, buttonRow, cancelButton, purchaseButton, input
} from "./../tradingForm.module.css";
class StocksTable extends Component {
    state = {
        stocks: [],
        prices: [],
        watchlist: [],
        tickerPos: 0,
        qty: 1,
        modal: false,
        confirmModal: false,
        orderType: "market"
    };
    async componentDidUpdate(prevProps) {
        if (prevProps.stocks !== this.props.stocks) {
            const { stocks, watchlist } = this.props;
            let tickers = '';
            for (let i = 0; i < stocks.length; i++) {
                tickers += `${stocks[i].ticker}, `;
            }
            let response = await axios.get(`https://cloud.iexapis.com/stable/tops/last?symbols=${tickers}&token=pk_5187144627fe41f783caf3f0341d7f3e`)
            console.log(response);
            let prices = response.data.map((val) => { return val.price });
            this.setState({
                stocks,
                watchlist,
                prices
            });
        }
    }

    onSell = i => {
        this.setState({ tickerPos: i });
        this.toggle();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onConfirmTrade = () => {
        let { qty, stocks, tickerPos } = this.state;
        let ticker = stocks[tickerPos].ticker;
        if (!Number.isInteger(parseInt(qty))) {
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
        this.toggleConfirmModal();
    }

    toggleConfirmModal = () => {
        this.setState({
            confirmModal: !this.state.confirmModal
        })
    }

    onTrade = () => {
        const { stocks, tickerPos, qty } = this.state;
        let ticker = stocks[tickerPos] ? stocks[tickerPos].ticker.toUpperCase() : "";
        this.props.handleSale(ticker, qty)
            .then(() => {
                if (this.props.tradeError) {
                    Swal.fire(
                        'Error!',
                        `${this.props.tradeMsg}`,
                        'error'
                    )
                } else {
                    this.toggleConfirmModal();
                    Swal.fire(
                        'Purchase Complete!',
                        `${this.props.tradeMsg}`,
                        'success'
                    )
                }
            });
    }

    render() {
        const { stocks, prices, tickerPos, orderType } = this.state;
        let { estimatedCost } = this.props;
        let ticker = stocks[tickerPos] ? stocks[tickerPos].ticker.toUpperCase() : "";
        return (
            <div>
                <div className={title}>Your Stocks</div>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr className={headerRow}>
                            <th className={tableCol}>
                                Ticker
                        </th>
                            <th className={tableCol}>
                                Stock Price
                        </th>
                            <th className={tableCol}>
                                Quantity
                        </th>
                            <th className={tableCol}>
                                Actions
                        </th>
                        </tr>
                        {
                            stocks.map((stock, i) => {
                                return (
                                    <tr className={tableRow} key={stock.ticker.toLowerCase()}>
                                        <td className={tableCol}>
                                            {stock.ticker.toUpperCase()}
                                        </td>
                                        <td className={tableCol}>
                                            {'$' + prices[i].toFixed(2)}
                                        </td>
                                        <td className={tableCol}>
                                            {stock.qty}
                                        </td>
                                        <td className={tableCol}>
                                            <div className={sellButton} onClick={() => this.onSell(i)} >Sell</div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="modal-md"
                >
                    <ModalBody>
                        <div className={confirmTitle}>Select Quantity</div>
                        <div className={confirmSubText}>How many {ticker} stocks would you like to sell?</div>
                        <div className={confirmDescWrapper}>
                            <div className={confrimDescRow}>
                                <div>Ticker:</div>
                                <div className={confirmDescText}>{ticker}</div>
                            </div>
                            <div className={confrimDescRow}>
                                <div>Quantity:</div>
                                <div className={confirmDescText}>
                                    <input className={input} value={this.state.qty}
                                        onChange={this.onChange} name="qty" />
                                </div>
                            </div>
                        </div>
                        <div className={buttonRow}>
                            <div className={cancelButton} onClick={this.toggle}>Cancel</div>
                            <div className={purchaseButton} onClick={this.onConfirmTrade}>Confirm Quantity</div>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal
                    isOpen={this.state.confirmModal}
                    toggle={this.toggleConfirmModal}
                    className="modal-md"
                >
                    <ModalBody className={confirmWrapper}>
                        <div className={confirmTitle}>Confirm Order</div>
                        <div className={confirmSubText}>Would you like to place the following order?</div>
                        <div className={confirmDescWrapper}>
                            <div className={confirmDescTitle}>
                                Sell {this.state.qty} {ticker} @ {estimatedCost} {orderType}
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
                                <div className={confirmDescText}>{this.state.qty}</div>
                            </div>
                            <div className={confrimDescRow}>
                                <div>Estimated Cost:</div>
                                <div className={confirmDescText}>{estimatedCost * this.state.qty}</div>
                            </div>
                        </div>
                        <div className={buttonRow}>
                            <div className={cancelButton} onClick={this.toggleConfirmModal}>Cancel</div>
                            <div className={purchaseButton} onClick={this.onTrade}>Sell</div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    stocks: state.auth.stocks,
    estimatedCost: state.trading.estimatedPrice,
    tradeError: state.trading.tradeError,
    tradeMsg: state.trading.tradeMsg,
});

export default connect(
    mapStateToProps,
    {
        getStockPrice,
        handleSale
    }
)(StocksTable);
