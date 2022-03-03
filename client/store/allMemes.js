import axios from 'axios';

const SET_MEMES = 'SET_MEMES';

const setMemes = (memes) => ({
  type: SET_MEMES,
  memes,
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

const memesReducer = (memes = [], action) => {
  switch (action.type) {
    case SET_MEMES:
      return action.memes;
    default:
      return memes;
  }
};

export default memesReducer;
