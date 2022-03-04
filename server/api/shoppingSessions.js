const router = require('express').Router();
const {
    models: { User, Meme, ShoppingSession, CartItem },
  } = require('../db');
  module.exports = router;

router.get('/', async (req, res, next) => {
    try{
        const shoppingSessions = await ShoppingSession.findAll()
        res.json(shoppingSessions)
    }catch(error){
        next(error)
    }
})