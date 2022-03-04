const Sequelize = require('sequelize');
const db = require('../db');

const Role = db.define('role', {
  name: {
    type: Sequelize.ENUM,
    values: ['admin', 'user', 'guest'],
  },
});

module.exports = Role;
