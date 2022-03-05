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
      attributes: ['id', 'username',"email","street", "city", "zip", "phoneNumber", "name","roleId"],
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
} );
router.delete('/:id', async(req,res,next) =>{
  try{
    const user = await User.destroy({
      where:{id : req.params.id}
    });
    if(user){
      res.sendStatus(204);
    }else{
      res.sendStatus(404);
    }
  }catch(err){
    next(err);
  }
} );
router.put('/:id/update', async(req,res,next)=>{
  try {
    const user = await User.findByPk(req.params.id);
    const updated = await user.update(req.body);
    res.json(updated);
  } catch (error) {
    next(console.error(error));
  }

})



