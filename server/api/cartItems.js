const router = require('express').Router();
const {
  models: { User, Meme, ShoppingSession, CartItem },
} = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const items = await CartItem.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});
