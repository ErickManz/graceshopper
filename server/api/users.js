const router = require('express').Router();
const {
  models: { User, Meme, ShoppingSession, CartItem },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/cart', async (req, res, next) => {
  try {
    // const id = req.params.id;
    const currentUser = await User.findByPk({
      where: {
        id: req.params.id,
      },
    });
    // const currentSession = await ShoppingSession.findByPk({
    //   where: {
    //     id: currentUser,
    //   },
    // });

    // currentSession.addCartItem(memeId);
    // console.log(Object.keys(currentMeme.__proto__));
    res.json(currentUser);
  } catch (err) {
    next(err);
  }
});

// find user
// use user to find sessionId
// check sessionId for cartItemID
