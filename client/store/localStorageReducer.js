import axios from 'axios';
import OrderItemsReducer from './orderReducer';

const ADD_ITEM_LOCAL = 'ADD_ITEM';
const GET_ITEM = 'GET_ITEM';

export const setCartItems = (OrderItem) => ({
  type: ADD_ITEM_LOCAL,
  OrderItem,
});
export const getCartItems = () => ({ type: GET_ITEM });

export const addItemToLocalCart = (product) => {
  return async (dispatch) => {
    const cart = JSON.parse(window.localStorage.getItem('guestCart')) || [];
    console.log(cart);

    const updateItem = cart.findIndex((item) => item.id === product.id);
    if (updateItem >= 0) {
      cart[updateItem].quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        url: product.url,
      });
    }
    dispatch(setCartItems(cart));
  };
};

export const getCart = () => {
  return async (dispatch) => {
    dispatch(getCartItems());
  };
};

const localStorageReducer = (products = [], action) => {
  switch (action.type) {
    case ADD_ITEM_LOCAL: {
      const product = JSON.stringify(action.OrderItem);
      localStorage.setItem('guestCart', product);
      return [...products, action.OrderItem];
    }
    case GET_ITEM:
      return products;
    default:
      return products;
  }
};

export default localStorageReducer;

// export const addItemsLocal = (id, item) => {
//   return async (dispatch) => {
//     try {
//       // const token = localStorage.getItem('token');
//       await axios.post(`/api/orderItems/${id}/cart`, item,
//        localStorage.setItem(item)

//       dispatch(addItem(newitem))
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
