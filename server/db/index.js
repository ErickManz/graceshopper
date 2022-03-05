//this is the access point for all things database related!

const db = require('./db');
const Meme = require('./models/Meme');
const User = require('./models/User');
const OrderItem = require('./models/OrderItem');
const Orders = require('./models/Orders');
const Genre = require('./models/Genre');
const Roles = require('./models/Role');
//associations could go here!

User.hasOne(Orders);
Orders.belongsTo(User);

OrderItem.belongsTo(Meme);
Meme.hasMany(OrderItem);

Orders.hasMany(OrderItem);
OrderItem.belongsTo(Orders);

Genre.hasMany(Meme);
Meme.belongsTo(Genre);

Roles.hasMany(User);
User.belongsTo(Roles);

module.exports = {
  db,
  models: {
    User,
    Meme,
    OrderItem,
    Orders,
    Genre,
    Roles,
  },
};
