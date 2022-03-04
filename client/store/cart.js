import axios from 'axios';
const SET_ITEMS = 'SET_ITEMS';
// const ADD_ITEM = 'ADD_ITEM';

export const setItems = (items) => ({
  type: SET_ITEMS,
  items,
});

// export const addItem = (cartItem) => ({ type: ADD_ITEM, cartItem });

export const getItems = (id) => {
  async (dispatch) => {
    console.log('test');
    try {
      const response = await axios.get(`/api/cartitems/${id}`);

      const cartItems = response.data;
      dispatch(setItems(cartItems));
    } catch (error) {
      console.log('test');
      console.log(error);
    }
  };
};

// export const addItems = (id, item) => async (dispatch) => {
//   const response = await axios.post(`/api/cartitems/${id}/cart`, item);
//   const newitem = response.data;
//   console.log(item);
//   dispatch(addItem(newitem));
// };
const item = [1];
const cartItemsReducer = (items = item, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return [items, ...action.items];
    // case ADD_ITEM:
    //   return [...items, action.item];
    default:
      return items;
  }
};

export default cartItemsReducer;
