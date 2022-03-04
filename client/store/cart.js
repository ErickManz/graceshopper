import axios from 'axios';
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

export const setItems = (cartItems) => ({
  type: SET_ITEMS,
  cartItems,
});

export const addItem = (cartItem) => ({ type: ADD_ITEM, cartItem });

export const getItems = (id) => {
  async (dispatch) => {
    try {
      const response = await axios.get(`/api/cartitems/${id}`);
      const cartItems = response.data;
      dispatch(setItems(cartItems));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItems = (id, item) => async (dispatch) => {
  const response = await axios.post(`/api/cartitems/${id}/cart`, item);
  const newitem = response.data;
  console.log(item);
  dispatch(addItem(newitem));
};

const cartItemsReducer = (items = [], action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.cartItems;
    case ADD_ITEM:
      return [...items, action.item];
    default:
      return items;
  }
};

export default cartItemsReducer;
