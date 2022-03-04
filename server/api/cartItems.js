const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const {
  models: { User, Meme, ShoppingSession, CartItem },
} = require('../db');

module.exports = router;


//get route is user session NOT shopping session
router.get('/:id', async (req, res, next) => {
  try {
    const currentSession = await ShoppingSession.findOne({
      where: {
        userId: req.params.id,
      },
    });

    if(currentSession=== null){
      throw new Error('Invalid User Id')
    }

    const items = await CartItem.findAll({
      where: {
        shoppingSessionId: currentSession.id,
      },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

//post item here
//callback custom validator that checks if memeId is in our database
const isValidMeme = () => body('memeId').custom(async (memeId) => {
  const meme = await Meme.findByPk(memeId)
  if(meme===null){
    throw new Error('Invalid MemeId')
  }
})

//validation for quantity > 1, valid memeId
router.post('/:id/cart', isValidMeme(), body('quantity').isInt({min: 1}), async (req, res, next) => {
  try {
    //collects errors from validators
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      throw errors.mapped()
    }

  
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

const isValidCartItem = () => body('id').custom(async (cartItemId) => {
  const meme = await CartItem.findByPk(cartItemId)
  if(meme===null){
    throw new Error('Invalid CartItemId')
  }
})
router.delete('/:id/cart', isValidCartItem(), async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      throw errors.mapped()
    }
    const itemToDelete = await CartItem.findByPk(req.body.id);
    itemToDelete.destroy();
    res.json(itemToDelete);
  } catch (error) {
    next(error);
  }
});

//edit quantity of cart item
//validating that body of request is an integer with express-validator
router.patch('/:id/cart/', isValidCartItem(), async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      throw errors.mapped()
    }
    const itemToUpdate = await CartItem.findByPk(req.body.id);
    if (req.body.quantity === 0) {
      await itemToUpdate.destroy();
    } else {
      await itemToUpdate.update({quantity: req.body.quantity})
    }

    res.send(itemToUpdate)
  } catch (error) {
    next(error);
  }
});
