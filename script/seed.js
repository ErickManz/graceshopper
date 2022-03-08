'use strict';

const { db, User, Meme, Order, OrderItem, Role } = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      firstName: 'Cody',
      lastName: 'Jones',
    }),
    User.create({
      username: 'murphy',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Brown',
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const memes = await Promise.all([
    Meme.create({
      name: `Smug Pepe`,
      price: 420.69,
      imageUrl: 'https://i.imgflip.com/ns3id.jpg',
      description: 'drake',
      stockQuantity: 42069,
      status: 'listed',
    }),
    Meme.create({
      name: `Drake's Preference`,
      price: 9.99,
      imageUrl: 'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg',
      description: 'drake',
      stockQuantity: 10,
      status: 'listed',
    }),
    Meme.create({
      name: `Two Buttons`,
      price: 12.99,
      imageUrl: 'https://imgflip.com/s/meme/Two-Buttons.jpg',
      description: 'which one?',
      stockQuantity: 7,
      status: 'listed',
    }),
    Meme.create({
      name: `Distracted Boyfriend`,
      price: 7.99,
      imageUrl: 'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg',
      description: 'check it out',
      stockQuantity: 15,
      status: 'listed',
    }),
    Meme.create({
      name: `Exit 12`,
      price: 11.99,
      imageUrl: 'https://imgflip.com/s/meme/Left-Exit-12-Off-Ramp.jpg',
      description: 'SKRRRRRRRT',
      stockQuantity: 12,
      status: 'unlisted',
    }),
    Meme.create({
      name: `Buff Doge v. Cheems`,
      price: 14.99,
      imageUrl: 'https://imgflip.com/s/meme/Buff-Doge-vs-Cheems.png',
      description: 'pls no hurt',
      stockQuantity: 11,
      status: 'listed',
    }),
    Meme.create({
      name: `Change My Mind`,
      price: 8.99,
      imageUrl: 'https://imgflip.com/s/meme/Change-My-Mind.jpg',
      description: 'go ahead and try',
      stockQuantity: 20,
      status: 'unlisted',
    }),
    Meme.create({
      name: `BatSlap`,
      price: 14.99,
      imageUrl: 'https://imgflip.com/s/meme/Batman-Slapping-Robin.jpg',
      description: 'BLAM!',
      stockQuantity: 6,
      status: 'listed',
    }),
    Meme.create({
      name: `Yelling at the Cat`,
      price: 19.99,
      imageUrl: 'https://imgflip.com/s/meme/Woman-Yelling-At-Cat.jpg',
      description: 'What did I do?',
      stockQuantity: 3,
      status: 'listed',
    }),
    Meme.create({
      name: `Burn It Down`,
      price: 10.99,
      imageUrl: 'https://imgflip.com/s/meme/Disaster-Girl.jpg',
      description: 'MUAHAHAHA',
      stockQuantity: 9,
      status: 'listed',
    }),
    Meme.create({
      name: `The Epic Handshake`,
      price: 9.99,
      imageUrl: 'https://imgflip.com/s/meme/Epic-Handshake.jpg',
      description: 'Gotchu bro',
      stockQuantity: `6`,
      status: 'listed',
    }),
    Meme.create({
      name: `Sad Pablo`,
      price: 18.99,
      imageUrl: 'https://imgflip.com/s/meme/Sad-Pablo-Escobar.jpg',
      description: 'por qué me lastimas así?',
      stockQuantity: 2,
      status: 'listed',
    }),
    Meme.create({
      name: `Fancy Bear`,
      price: 7.99,
      imageUrl: 'https://imgflip.com/s/meme/Tuxedo-Winnie-The-Pooh.png',
      description: 'Ahem',
      stockQuantity: 19,
      status: 'listed',
    }),
    Meme.create({
      name: `Monkey Side-Eye`,
      price: 21.99,
      imageUrl: 'https://imgflip.com/s/meme/Monkey-Puppet.jpg',
      description: 'nothing to see here',
      stockQuantity: 4,
      status: 'listed',
    }),
    Meme.create({
      name: `Panik Kalm Panik`,
      price: 14.99,
      imageUrl: 'https://imgflip.com/s/meme/Panik-Kalm-Panik.png',
      description: '!!!!!',
      stockQuantity: 1,
      status: 'listed',
    }),
    Meme.create({
      name: `Everywhere, Woody`,
      price: 16.99,
      imageUrl: 'https://imgflip.com/s/meme/X-X-Everywhere.jpg',
      description: 'believe me',
      stockQuantity: 8,
      status: 'unlisted',
    }),
    Meme.create({
      name: `Mocking Spongebob`,
      price: 12.99,
      imageUrl: 'https://imgflip.com/s/meme/Mocking-Spongebob.jpg',
      description: 'this is what you look like',
      stockQuantity: 10,
      status: 'listed',
    }),
    Meme.create({
      name: `Always Has Been...`,
      price: 24.99,
      imageUrl: 'https://imgflip.com/s/meme/Always-Has-Been.png',
      description: 'It is?',
      stockQuantity: 3,
      status: 'listed',
    }),
    Meme.create({
      name: `Bike Fall`,
      price: 7.99,
      imageUrl: 'https://imgflip.com/s/meme/Bike-Fall.jpg',
      description: 'ouch',
      stockQuantity: 19,
      status: 'listed',
    }),
    Meme.create({
      name: `Clown World`,
      price: 10.99,
      imageUrl: 'https://imgflip.com/s/meme/Clown-Applying-Makeup.jpg',
      description: 'honk honk',
      stockQuantity: 11,
      status: 'unlisted',
    }),
    Meme.create({
      name: `Is this a Meme?`,
      price: 14.99,
      imageUrl: 'https://imgflip.com/s/meme/Is-This-A-Pigeon.jpg',
      description: 'what a joke of a website',
      stockQuantity: 18,
      status: 'listed',
    }),
    Meme.create({
      name: `One Does Not Simply`,
      price: 21.99,
      imageUrl: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      description: 'code a whole ecommerce site in a week',
      stockQuantity: 11,
      status: 'listed',
    }),
    Meme.create({
      name: `This is Fine`,
      price: 19.99,
      imageUrl: 'https://imgflip.com/s/meme/This-Is-Fine.jpg',
      description: 'really',
      stockQuantity: 7,
      status: 'listed',
    }),
    Meme.create({
      name: `Aliens`,
      price: 51.0,
      imageUrl: 'https://imgflip.com/s/meme/Ancient-Aliens.jpg',
      description: 'Aliens',
      stockQuantity: 7,
      status: 'listed',
    }),
    Meme.create({
      name: `Shocked Pikachu`,
      price: 18.99,
      imageUrl: 'https://imgflip.com/s/meme/Surprised-Pikachu.jpg',
      description: ':0',
      stockQuantity: 11,
      status: 'listed',
    }),
    Meme.create({
      name: `Two Buttons`,
      price: 12.99,
      imageUrl: 'https://imgflip.com/s/meme/Two-Buttons.jpg',
      description: 'which one?',
      stockQuantity: 7,
      status: 'listed',
    }),
    Meme.create({
      name: `Best I Can Do`,
      price: 0.99,
      imageUrl: 'https://i.imgflip.com/19vcz0.jpg',
      description: 'is 99 cents',
      stockQuantity: 99,
      status: 'listed',
    }),
  ]);

  const orderItems = await Promise.all([
    OrderItem.create({ quantity: 1, salePrice: 10 }),
    OrderItem.create({ quantity: 2, salePrice: 10 }),
  ]);

  const roles = await Promise.all([
    Role.create({ name: 'admin' }),
    Role.create({ name: 'user' }),
  ]);

  const session = await Order.create();

  await users[0].setOrders(session);
  await session.setOrderItems([...orderItems]);
  await orderItems[0].setMeme(memes[4]);
  await orderItems[1].setMeme(memes[0]);

  await users[0].setRole(roles[0]);
  await users[1].setRole(roles[1]);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    memes,
    orderItems,
    session,
    roles,
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
