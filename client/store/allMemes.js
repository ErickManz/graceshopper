import axios from 'axios';

const SET_MEMES = 'SET_MEMES';
const CREATE_MEME = 'CREATE_MEME';

const setMemes = (memes) => ({
  type: SET_MEMES,
  memes,
});

const newMeme = (meme) => ({
  type: CREATE_MEME,
  meme,
});

export const getMemes = () => {
  return async (dispatch) => {
    try {
      const { data: memes } = await axios.get('/api/memes');
      dispatch(setMemes(memes));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createMeme = (meme) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post('/api/memes', meme);
      dispatch(newMeme(created));
    } catch (error) {
      console.error(error);
    }
  };
};

const memesReducer = (memes = [], action) => {
  switch (action.type) {
    case SET_MEMES:
      return action.memes;
    case CREATE_MEME:
      return [...memes, action.meme];
    default:
      return memes;
  }
};

export default memesReducer;
