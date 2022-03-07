//this is the access point for all things database related!

const db = require('./db');
const Meme = require('./models/Meme');
const User = require('./models/User');
const OrderItem = require('./models/OrderItem');

const Order = require('./models/Order');

const Genre = require('./models/Genre');
const Role = require('./models/Role');
//associations could go here!

User.hasMany(Order);

Order.belongsTo(User);

OrderItem.belongsTo(Meme);
Meme.hasMany(OrderItem);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Genre.hasMany(Meme);
Meme.belongsTo(Genre);

Role.hasMany(User);
User.belongsTo(Role);

module.exports = {
  db,
  User,
  Meme,
  OrderItem,
  Order,
  Genre,
  Role,

};
