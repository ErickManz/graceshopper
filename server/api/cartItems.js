const router = require('express').Router();
const {
  models: { User, Meme, ShoppingSession, CartItem },
} = require('../db');

module.exports = router;

//get route is user session NOT shopping session
//secure cart / user
//reads token via payload
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const currentSession = await ShoppingSession.findOne({
      where: {
        userId: id,
      },
    });
    const items = await CartItem.findAll({
      where: {
        shoppingSessionId: currentSession.id,
      },
      include: [{ model: Meme }],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

//post item here
router.post('/:id/cart', async (req, res, next) => {
  try {
    // const id = req.params.id;

    const currentUser = await User.findByPk(req.params.id);

    const [currentSession, created] = await ShoppingSession.findOrCreate({
      where: {
        userId: currentUser.id,
      },
    });

    const currentItem = await CartItem.create({
      memeId: req.body.memeId,

      quantity: req.body.quantity,
    });

    if (currentSession) {
      currentSession.addCartItem(currentItem);
      // console.log(Object.keys(currentSession.__proto__));
      res.json(currentSession);
    } else {
      created.setUser(currentUser);
      created.addCartItem(currentItem);
      res.json(created);
    }
  } catch (err) {
    next(err);
  }
});

// find user
// use user to find sessionId
// check sessionId for cartItemID
// new shopsession here
//association shoppingsession with user
