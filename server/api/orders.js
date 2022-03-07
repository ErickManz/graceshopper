const router = require('express').Router();
const { User, Meme, Order, OrderItem } = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});
