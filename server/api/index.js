const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/memes', require('./memes'));
router.use('/cartitems', require('./cartItems'));
router.use('/shoppingsessions', require('./shoppingSessions'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
