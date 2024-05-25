// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
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
    paymentHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Payment'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
