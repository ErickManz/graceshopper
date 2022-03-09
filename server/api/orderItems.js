const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const { User, Meme, Order, OrderItem } = require('../db');
const { requireToken, isAdmin } = require('../security/gatekeeping');

module.exports = router;

//get route is user session NOT shopping session
//secure cart / user
//reads token via payload
//route only returns 'open' order items
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const currentSession = await Order.findOne({
      where: {
        status: 'open',
        userId: id,
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
    console.log('HERE ARE THE ORDER ITEMS!!!!', items);
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
  requireToken,
  isValidMeme(),
  body('quantity').isInt({ min: 0 }),
  async (req, res, next) => {
    try {
      console.log(req.body);
      //collects errors from validators
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.mapped();
      }

      const currentUser = await User.findByPk(req.params.id);

      const [currentSession, created] = await Order.findOrCreate({
        where: {
          userId: currentUser.id,
          status: 'open',
        },
      });
      const itemToUpdate = await OrderItem.findOne({
        where: {
          memeId: req.body.memeId,
          orderId: currentSession.id,
        },
      });

      if (itemToUpdate) {
        const total = itemToUpdate.quantity + parseInt(req.body.quantity);
        await itemToUpdate.update({ quantity: total });
      } else {
        console.log('Is it this one? #2', req.body);
        var newOrder = await OrderItem.create({
          memeId: req.body.memeId,

          quantity: req.body.quantity,

          salePrice: req.body.salePrice,
        });
      }

      if (currentSession) {
        currentSession.addOrderItem(newOrder);
        // console.log(Object.keys(currentSession.__proto__));
        res.json(currentSession);
      } else {
        created.setUser(currentUser);
        created.addOrderItem(newOrder);
        res.json(created);
      }
    } catch (err) {
      next(err);
    }
  }
);

const isValidorderItem = () =>
  body('id').custom(async (orderItemId) => {
    const meme = await OrderItem.findOne({ where: { orderItemId } });
    if (meme === null) {
      throw new Error('Invalid orderItemId');
    }
  });

//edit quantity of cart item
//validating that body of request is an integer with express-validator
router.patch('/:id/cart', requireToken, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentUser = await User.findOne({ where: { id: userId } });
    const currentSession = await Order.findOne({
      where: {
        userId: currentUser.id,
        status: 'open',
      },
    });

    const itemToUpdate = await OrderItem.findOne({
      where: {
        memeId: req.body.memeId,
        orderId: currentSession.id,
      },
    });
    let data = '';
    if (req.body.quantity <= 0) {
      data = await itemToUpdate.destroy();
    } else {
      data = await itemToUpdate.update({ quantity: req.body.quantity });
    }
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// router.post(
//   '/:id/cart',
//   requireToken,
//   isValidMeme(),
//   body('quantity').isInt({ min: 1 }),
//   async (req, res, next) => {
//     try {
//       const currentUser = await User.findByPk(req.params.id);
//       const currentSession = await Order.findOne({
//         where: {
//           userId: currentUser.id,
//           status: 'open',
//         },
//       });
//       if (!currentSession) {
//         currentSession = await currentUser.createOrder({});
//       }
//     } catch (error) {}
//   }
// );

// router.post(
//   '/:id/cart',
//   requireToken,
//   isValidMeme(),
//   body('quantity').isInt({ min: 1 }),
//   async (req, res, next) => {
//     try {
//       console.log(req.body);
//       //collects errors from validators
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         throw errors.mapped();
//       }

//       const currentUser = await User.findByPk(req.params.id);

//       const [currentSession, created] = await Order.findOrCreate({
//         where: {
//           userId: currentUser.id,
//           status: 'open',
//         },
//       });
//       const [itemToUpdate, newItem] = await OrderItem.findOrCreate({
//         where: {
//           memeId: req.body.memeId,
//           orderId: currentSession.id,
//         },
//       });

//       if (itemToUpdate) {
//         const total = itemToUpdate.quantity + parseInt(req.body.quantity);
//         await itemToUpdate.update({ quantity: total });
//       } else {
//         console.log(req.body);
//         var newOrder = await newItem.update({
//           memeId: req.body.memeId,

//           quantity: req.body.quantity,

//           salePrice: req.body.salePrice,
//         });
//       }

//       if (currentSession) {
//         currentSession.addOrderItem(newOrder);
//         // console.log(Object.keys(currentSession.__proto__));
//         res.json(currentSession);
//       } else {
//         created.setUser(currentUser);
//         created.addOrderItem(newOrder);
//         res.json(created);
//       }
//     } catch (err) {
//       next(err);
//     }
//   }
// );
