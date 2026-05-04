const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const { adminProtect } = require('../middleware/adminMiddleware');

const router = express.Router();

// POST /api/admin/auth/login
router.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail !== process.env.ADMIN_EMAIL.toLowerCase() ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: 'Invalid admin email or password.' });
    }

    const token = jwt.sign(
      { role: 'admin', email: normalizedEmail },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/stats  (protected)
router.get('/stats', adminProtect, async (req, res) => {
  try {
    const [totalProducts, totalCustomers, totalOrders, orders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Order.countDocuments(),
      Order.find().select('totalAmount status createdAt'),
    ]);

    const totalRevenue = orders
      .filter((o) => o.status === 'Paid' || o.status === 'Delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const paidOrders = orders.filter((o) => o.status === 'Paid' || o.status === 'Delivered').length;
    const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;

    res.json({
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRevenue,
      paidOrders,
      pendingOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/stats/revenue  — daily revenue for the last 7 days (protected)
router.get('/stats/revenue', adminProtect, async (req, res) => {
  try {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();

    // Build last 7 days
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const orders = await Order.find({
        createdAt: { $gte: start, $lte: end },
        status: { $in: ['Paid', 'Delivered'] },
      }).select('totalAmount');

      const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      result.push({ day: days[start.getDay()], revenue });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
