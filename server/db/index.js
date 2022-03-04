//this is the access point for all things database related!

const db = require('./db');
const Meme = require('./models/Meme');
const User = require('./models/User');
const CartItem = require('./models/CartItem');
const ShoppingSession = require('./models/ShoppingSession');
const Genre = require('./models/Genre');
const Role = require('./models/Role');
//associations could go here!

User.hasOne(ShoppingSession);
ShoppingSession.belongsTo(User);

CartItem.belongsTo(Meme);
Meme.hasMany(CartItem);

ShoppingSession.hasMany(CartItem);
CartItem.belongsTo(ShoppingSession);

Genre.hasMany(Meme);
Meme.belongsTo(Genre);

Role.hasMany(User);
User.belongsTo(Role);

module.exports = {
  db,
  models: {
    User,
    Meme,
    CartItem,
    ShoppingSession,
    Genre,
    Role,
  },
};
