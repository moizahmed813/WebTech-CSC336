const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');

router.post('/submit-order', async (req, res) => {
    try {
        const { cart, deliveryInfo } = req.body;
        const newOrder = new Order({
            cart,
            deliveryInfo,
            createdAt: new Date()
        });
        await newOrder.save();
        res.status(200).json({ message: 'Order submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting order', error });
    }
});

module.exports = router;
