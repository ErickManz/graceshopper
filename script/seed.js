'use strict';

const {
  db,
  models: { User, Meme, Order, OrderItem,Roles },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const memes = await Promise.all([
    Meme.create({
      name: 'pepe',
      price: 10.0,
      imageUrl:
        'https://i.guim.co.uk/img/media/327e46c3ab049358fad80575146be9e0e65686e7/0_0_1023_742/master/1023.jpg?width=700&quality=85&auto=format&fit=max&s=3d74c30c02485d03b0166f4908ddaa35',
      description: 'frog',
      genre: 'pepe',
      stockQuantity: 5,
    }),
    Meme.create({
      name: 'arthur fist',
      price: 20.0,
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/-khg_S_-tf3eS4XqudtTqK2JwqM=/69x0:856x525/1200x800/filters:focal(69x0:856x525)/cdn.vox-cdn.com/uploads/chorus_image/image/50263513/Screen_Shot_2016-08-01_at_12.34.21_PM.0.0.png',
      description: 'arthur',
      genre: 'mad',
      stockQuantity: 10,
    }),
    Meme.create({
      name: 'evil patrick',
      price: 10,
      imageUrl:
        'https://pyxis.nymag.com/v1/imgs/0f9/f96/029acbf4c6d8c67e138e1eb06a277204bf-05-patrick.rsocial.w1200.jpg',
      description: 'evil patrick',
      genre: 'evil',
      stockQuantity: 5,
    }),
    Meme.create({
      name: 'is this a meme',
      price: 10,
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/8rF2keXrhL8sYlEbVbtaJpIC4qs=/0x10:500x291/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/59741997/n4scgse21iuz.0.jpg',
      description: 'is this a butterfly',
      genre: 'confused',
      stockQuantity: 5,
    }),
    Meme.create({
      name: 'kermit',
      price: 10,
      genre: 'funny',
      stockQuantity: 5,
    }),
  ]);

  const OrderItems = await Promise.all([
    OrderItem.create({ quantity: 1, salePrice: 10 }),
    OrderItem.create({ quantity: 2, salePrice: 10 }),
  ]);

  const Role = await Promise.all([
    Roles.create({name:'admin'}),
    Roles.create({name:'user'}),
    Roles.create({name:'guest'}),
  ])

  const session = await Order.create();

  await users[0].setOrders(session);
  await session.setOrderItems([...OrderItems]);
  await OrderItems[0].setMeme(memes[4]);
  await OrderItems[1].setMeme(memes[0]);

  await users[0].setRole(Role[0]);
  await users[1].setRole(Role[1]);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    memes,
    OrderItems,
    session,
    Role
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
