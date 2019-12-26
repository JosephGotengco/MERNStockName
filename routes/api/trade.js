const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require('axios');

const User = require("../../models/User");

// @route   POST api/trade
// @desc    Send Buy Request
// @access  Private
router.post("/", isLoggedIn, async (req, res) => {
    let { orderType, ticker } = req.body;
    ticker = ticker.toUpperCase();
    const qty = parseInt(req.body['qty']);
    const orderTypes = config.get("orderTypes");
    const token = config.get("IEXCloudToken");
    console.log(req.session);

    // if qty is below 0 or above 100, return bad req
    if (qty < 1 || 100 < qty) return res.status(400).json({ msg: "Purchase quantity must be between 1 and 100" });
    if (!Number.isInteger(qty)) return res.status(400).json({ msg: "Purchase quantity must be an integer" });
    // if invalid order type, return bad req
    if (!orderTypes.includes(orderType)) return res.status(400).json({ msg: "Invalid order type" });

    if (orderType === 'market') {
        // 1. Call IEX cloud
        // 2. Check Balance, etc.
        // 3. Complete order, save to stock, and return res
        try {
            let axiosRes = await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/previous?token=${token}`);
            const { close } = axiosRes.data;
            let user = await User.findById(req.user._id);
            const { balance, stocks } = user;
            if (balance < close * qty) return res.status(400).json({ msg: "You do not have enough money for this purchase" });
            var existingStock = stocks.filter(obj => {
                return obj.ticker === ticker
            });
            if (existingStock.length >= 1) {
                let existingQty = existingStock[0].qty;
                var newQty = existingQty + qty;
                let newBalance = balance - close * qty;
                let i = stocks.indexOf(existingStock[0]);
                stocks.splice(i, 1);
                stocks.push({ ticker, qty: newQty });
                await User.updateOne(
                    { _id: req.user._id },
                    {
                        $set: {
                            balance: newBalance,
                            stocks: stocks
                        }
                    }
                );
                user = await User.findById(req.user._id);
                req.session.passport.user = user;
                res.status(200).json({ msg: "Purchase successful", stocks, balance: newBalance })
            } else {
                let newBalance = balance - close * qty;
                stocks.push({ ticker, qty });
                await User.updateOne(
                    { _id: req.user._id },
                    {
                        $set: {
                            balance: newBalance,
                            stocks: stocks
                        }
                    }
                );
                user = await User.findById(req.user._id);
                req.session.passport.user = user;
                res.status(200).json({ msg: "Purchase successful", stocks, balance: newBalance });
            }
        } catch (e) {
            // console.log(e);
            let errMsg = e.response.data;
            if (errMsg === "The API key provided is not valid.") return res.status(500).json({ msg: "Oops...a server error occured and your purchase was not completed" })
            if (errMsg === 'Unknown symbol') return res.status(400).json({ msg: "Invalid ticker" });
            if (errMsg === 'Not Found') return res.status(400).json({ msg: "Invalid ticker" });
        }
    } else {
        const { price } = req.body;
        // if (activation) price is below 0 USD, return bad req
        if (price < 0) return res.status(400).json({ msg: "Purchase price must be above 0" });
        // Add to user's watchlist
        let user = await User.findById(req.user._id);
        const { watchlist } = user;

        // new Watchlist Object = nWO = im lazy
        let nWO = {
            ticker,
            qty,
            price,
            orderType,
            dateCreated: Date.now()
        }

        // existing Watchlist Object = eWO = im lazy
        var eWO = watchlist.filter(obj => {
            return obj.ticker === ticker
        });

        watchlist.push(nWO);
        await User.updateOne(
            { _id: req.user._id },
            {
                $set: {
                    watchlist
                }
            }
        );
        res.status(200).json({ msg: "Order placed", ticker, qty, price, orderType, dateCreated: nWO.dateCreated });
    }
});

// @route   POST api/trade/sell
// @desc    Send Sell Request
// @access  Private
router.post("/sell", async (req, res) => {
    const { ticker } = req.body;
    const qty = parseInt(req.body['qty']);
    const token = config.get("IEXCloudToken");
    // if qty is below 0 or above 100, return bad req
    if (qty < 1 || 100 < qty) return res.status(400).json({ msg: "Sale quantity must be between 1 and 100" });
    if (!Number.isInteger(qty)) return res.status(400).json({ msg: "Purchase quantity must be an integer" });
    try {
        let user = await User.findById(req.user._id);
        let index = null;
        for (let i = 0; i < user.stocks.length; i++) {
            if (user.stocks[i].ticker.toUpperCase() === ticker.toUpperCase()) {
                index = i;
            };
        }
        console.log(index);
        if (!index) return res.status(400).json({ msg: "You do not own shares of that ticker" });

        let stock = user.stocks[index];
        if (stock.qty < qty) return res.status(400).json({ msg: "You do not own enough shares of that ticker" });

        let axiosRes = await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/previous?token=${token}`);
        const { close } = axiosRes.data;

        let oldQty = stock.qty;
        stock.qty = stock.qty - qty;

        let newBalance = user.balance + qty * close;
        let newStocks = user.stocks;
        newStocks[index] = stock;

        await User.updateOne(
            { _id: req.user._id },
            {
                $set: {
                    balance: newBalance,
                    stocks: newStocks
                }
            }
        )
        user = await User.findById(req.user._id);
        req.session.passport.user = user;
        res.status(200).json({ msg: "Sale successful", stocks: newStocks, balance: newBalance });

    } catch (e) {
        console.log(e);
    }
});

function isLoggedIn(req, res, next) {
    if (req.session.passport !== undefined) {
        next();
    } else {
        res.status(401).json({ msg: "authorization denied" });
    }
}

module.exports = router;