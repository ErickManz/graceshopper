import axios from 'axios';


const GET_SINGLE_MEME = "GET_SINGLE_MEME";
const ADD_CART_ITEM = "ADD_CART_ITEM";

const singleMeme = (meme) =>({
  type:GET_SINGLE_MEME,
  meme
})

const addToCart = (meme) =>({
  type:ADD_CART_ITEM,
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
export const addCartItem = (id, items) =>{
  return async(dispatch) => {
    try {
      const {data} = await axios.get(`/api/cartitems/${id}`,items)
      dispatch(addToCart(data));
    } catch (error) {
      console.error(error)
    }
  }
}

const singleMemeReducer = (meme = {}, action) =>{
  switch(action.type){
    case GET_SINGLE_MEME:
      return action.meme;
    case ADD_CART_ITEM:
      return action.meme
    default:
      return meme;
  }
}
export default singleMemeReducer;
