import axios from 'axios';
import OrderItemsReducer from './orderReducer';

const ADD_ITEM = 'ADD_ITEM';

export const setCartItems = (OrderItem) => ({ type: ADD_ITEM, OrderItem });

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
        quantity: product.quantity,
        price: product.price,
      });
    }
    dispatch(setCartItems(cart));
  };
};

const localStorageReducer = (products = [], action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const product = JSON.stringify(action.OrderItem);
      localStorage.setItem('guestCart', product);
      return [...products, action.OrderItem];
    }
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
