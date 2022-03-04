const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const {
  models: { User, Meme, Orders, OrderItem },
} = require('../db');

module.exports = router;

//get route is user session NOT shopping session
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const currentSession = await Orders.findOne({
      where: {
        userId: id,
      },
    });
    const items = await OrderItem.findAll({
      where: {
        OrdersId: currentSession.id,
      },
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

    const [currentSession, created] = await Orders.findOrCreate({
      where: {
        userId: currentUser.id,
      },
    });

    const currentItem = await OrderItem.create({
      memeId: req.body.memeId,

      quantity: req.body.quantity,
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
});

router.delete('/:id/cart', async (req, res, next) => {
  try {
    const itemToDelete = await OrderItem.findByPk(req.body.id);
    itemToDelete.destroy();
    res.json(itemToDelete);
  } catch (error) {
    next(error);
  }
});

//edit quantity of cart item
//validating that body of request is an integer with express-validator
router.patch('/:id/cart/',  async (req, res, next) => {
  try {

    const itemToUpdate = await OrderItem.findByPk(req.body.id);
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
