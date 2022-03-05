const router = require('express').Router();
const {
  models: { User, Meme, Orders, OrderItem },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username',"email","street", "city", "zip", "phoneNumber", "name"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async(req,res,next) =>{
  try{
    const user = await User.findByPk(req.params.id);
      if(user){
        res.status(201).send(user);
      }else{
        res.status(404).send("User doesnt not exist")
      }
  }catch(err){
    next(err);
  }
} )
