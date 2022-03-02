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

router.post('/', async (req, res, next) => {
  try {
    const currentMeme = await Meme.findByPk();
  } catch (err) {
    next(err);
  }
});
