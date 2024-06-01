// models/Payment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        amount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Payment', PaymentSchema);