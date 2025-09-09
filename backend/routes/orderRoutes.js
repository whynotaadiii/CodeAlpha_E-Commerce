const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { protect } = require('../middleware/authMiddleware');

// Create a new order
router.post('/', protect, async (req, res) => {
    const { orderItems, totalPrice } = req.body;
    
    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

module.exports = router;