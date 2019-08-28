const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 500
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },
    stocks: {
        type: Array,
        default: []
    },
    watchlist: {
        type: Array,
        default: []
    },
    hasConfirmedEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'standard',
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);