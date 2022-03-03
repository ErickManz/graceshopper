import axios from 'axios';

const SET_MEME = 'SET_MEME';

const setMeme = (meme) => ({
  type: SET_MEME,
  meme,
});

export const getMeme = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/memes/${id}`);
      dispatch(setMeme(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default singleMemeReducer = (meme = {}, action) => {
  switch (action.type) {
    case SET_MEME:
      return action.meme;
    default:
      return meme;
  }
};
