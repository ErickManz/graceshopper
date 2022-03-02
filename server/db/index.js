//this is the access point for all things database related!

const db = require('./db');
const Meme = require('./models/Meme');
const User = require('./models/User');
const CartItem = require('./models/CartItem');
const ShoppingSession = require('./models/ShoppingSession');
//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Meme,
    CartItem,
    ShoppingSession,
  },
};
