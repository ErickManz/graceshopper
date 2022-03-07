const router = require('express').Router();
const { body, validationResult } = require('express-validator');


const {
  models: { User, Meme, Order, OrderItem },
} = require('../db');


module.exports = router;

//get route is user session NOT shopping session
//secure cart / user
//reads token via payload
//route only returns 'open' order items
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const currentSession = await Order.findOne({
      where: {
        status: 'open',
        userId: id
      },
    });

    if (currentSession === null) {
      throw new Error('Invalid User Id');
    }
  
    const items = await OrderItem.findAll({
      where: {
        orderId: currentSession.id,
      },
      include: [{ model: Meme }],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

//post item here
//callback custom validator that checks if memeId is in our database
const isValidMeme = () =>
  body('memeId').custom(async (memeId) => {
    const meme = await Meme.findByPk(memeId);
    if (meme === null) {
      throw new Error('Invalid MemeId');
    }
  });

//validation for quantity > 1, valid memeId
router.post(
  '/:id/cart',
  isValidMeme(),
  body('quantity').isInt({ min: 1 }),
  async (req, res, next) => {
    try {
      //collects errors from validators
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.mapped();
      }

      const currentUser = await User.findByPk(req.params.id);

      const [currentSession, created] = await Order.findOrCreate({
        where: {
          userId: currentUser.id,
          status: 'open'
        },
      });

      const currentItem = await OrderItem.create({
        memeId: req.body.memeId,

        quantity: req.body.quantity,

        salePrice: req.body.salePrice
      });

      if (currentSession) {
        currentSession.addOrderItem(currentItem);
        // console.log(Object.keys(currentSession.__proto__));
        res.json(currentSession);
      } else {
        created.setUser(currentUser);
        created.addOrderItem(currentItem);
        res.json(created);
      }
    } catch (err) {
      next(err);
    }
  }
);

const isValidorderItem = () =>
  body('id').custom(async (orderItemId) => {
    const meme = await OrderItem.findByPk(orderItemId);
    if (meme === null) {
      throw new Error('Invalid orderItemId');
    }
  });
router.delete('/:id/cart', isValidorderItem(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.mapped();
    }
    const itemToDelete = await OrderItem.findByPk(req.body.id);
    itemToDelete.destroy();
    res.json(itemToDelete);
  } catch (error) {
    next(error);
  }
});

//edit quantity of cart item
//validating that body of request is an integer with express-validator
router.patch('/:id/cart/', isValidorderItem(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.mapped();
    }
    const itemToUpdate = await OrderItem.findByPk(req.body.id);
    if (req.body.quantity === 0) {
      await itemToUpdate.destroy();
    } else {
      await itemToUpdate.update({ quantity: req.body.quantity });
    }

    res.send(itemToUpdate);
  } catch (error) {
    next(error);
  }
});
