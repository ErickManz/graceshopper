const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingSession = db.define('shoppingSession', {
  total: {
    type: Sequelize.DECIMAL,
  },
});

module.exports = ShoppingSession;
