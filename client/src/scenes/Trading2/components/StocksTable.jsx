import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { tableRow, tableCol, title, headerRow, sellButton } from "./../table.module.css";
class StocksTable extends Component {
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

    onSell = () => {

    }

    render() {
        const { stocks, prices } = this.state;

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
                                console.log(i % 2 === 0)
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
                                            <div className={sellButton} onClick={() => this.onSell()}>Sell</div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
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
)(StocksTable);
