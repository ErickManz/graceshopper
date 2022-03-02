import axios from 'axios';


const GET_SINGLE_MEME = "GET_SINGLE_MEME";

const singleMeme = (meme) =>({
  type:GET_SINGLE_MEME,
  meme
})

export const getSingleMeme = (id) =>{
    return async(dispatch) =>{
      try {
        const {data} = await axios.get(`/api/memes/${id}`);
        dispatch(singleMeme(data));
      } catch (error) {
        console.error(error);
      }
    }
}

const singleMemeReducer = (meme = {}, action) =>{
  switch(action.type){
    case GET_SINGLE_MEME:
      return action.meme;
    default:
      return meme;
  }
}
export default singleMemeReducer;
