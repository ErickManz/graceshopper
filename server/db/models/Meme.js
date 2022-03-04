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
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://imgflip.com/i/672dsa',
  },
  description: {
    type: Sequelize.TEXT,
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
  },
  artist: {
    type: Sequelize.STRING,
  },
});

module.exports = Meme;
