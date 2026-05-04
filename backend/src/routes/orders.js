const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');

const router = express.Router();

// POST /api/orders  — place an order (guest or authenticated)
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount, customerName, customerEmail, customerPhone, deliveryAddress, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item.' });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid order total.' });
    }

    // If a valid auth token is present, attach the customer
    let customerId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
        customerId = decoded.id || null;
      } catch {
        // Guest order — no token or invalid token, that's fine
      }
    }

    const order = await Order.create({
      customer: customerId,
      customerName: customerName || 'Guest',
      customerEmail: customerEmail || '',
      customerPhone: customerPhone || '',
      items,
      totalAmount,
      deliveryAddress: deliveryAddress || '',
      notes: notes || '',
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/orders/my  — logged-in customer's own orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name image category');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/track/:reference  — public order tracking by reference
router.get('/track/:reference', async (req, res) => {
  try {
    const order = await Order.findOne({ reference: req.params.reference.toUpperCase() })
      .select('reference status totalAmount createdAt updatedAt items customerName')
      .populate('items.product', 'name image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found. Please check your reference number.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders  — all orders (admin only)
router.get('/', adminProtect, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('customer', 'name email'),
      Order.countDocuments(filter),
    ]);

    res.json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:id  — single order detail (admin only)
router.get('/:id', adminProtect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('items.product', 'name image category');

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/orders/:id/status  — update order status (admin only)
router.patch('/:id/status', adminProtect, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Paid', 'Dispatched', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
