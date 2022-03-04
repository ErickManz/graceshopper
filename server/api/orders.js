const router = require('express').Router();
const {
    models: { User, Meme, Orders, OrderItem },
  } = require('../db');
  module.exports = router;

router.get('/', async (req, res, next) => {
    try{
        const Orderss = await Orders.findAll()
        res.json(Orderss)
    }catch(error){
        next(error)
    }
})
