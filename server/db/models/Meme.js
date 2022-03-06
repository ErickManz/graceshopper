const Sequelize = require('sequelize');
const db = require('../db');

const Meme = db.define('meme', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min:0,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://i.imgflip.com/672dsa.jpg',
  },
  description: {
    type: Sequelize.TEXT,
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Meme;
