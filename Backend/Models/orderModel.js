const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cart: [{
        name: String,
        category: String,
        price: String,
        quantity: Number,
        imageUrl: String
    }],
    deliveryInfo: {
        firstName: String,
        lastName: String,
        phoneNo: String,
        email: String,
        address: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
