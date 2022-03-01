const router = require('express').Router();
const {
  models: { Meme },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const memes = await Meme.findAll();
    res.json(memes);
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req,res,next)=>{
  try {
    const info = req.body
    const meme = await Meme.create(info)
    res.json(meme);
  } catch (error) {
    next(error )
  }
})
router.get('/:id', async (req,res,next) =>{
  try {
    const id = req.params.id
    const meme = await Meme.findByPk(id);
    if(meme){
    res.json(meme);
    }else {
      res.status(404).send("this meme does not exist")
    }
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async(req,res,next) =>{
  try {
    const memeId  = req.params.id
     const data = await Meme.destroy({
       where:{
       id:memeId
     }})
     if(data){
       res.sendStatus(204)
     }else {
     res.sendStatus(404);
     }
  } catch (error) {
    next(error)
  }
});
router.put("/:id", async(req,res,next)=>{
  try {
    const meme = await Meme.findByPk(req.params.id)
    const info = req.body;
    const data = await meme.update(info)
    res.json(data);
  } catch (error) {
    next(error)
  }
})


