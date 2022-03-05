import axios from 'axios';
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

export const setItems = (OrderItems) => ({
  type: SET_ITEMS,
  OrderItems,
});

export const addItem = (OrderItem) => ({ type: ADD_ITEM, OrderItem });

export const getItems = (id) => {
  return async (dispatch) => {
    console.log('test');
    try {
      const response = await axios.get(`/api/orderItems/${id}`);
      const OrderItems = response.data;
      dispatch(setItems(OrderItems));
    } catch (error) {
      console.log('test');
      console.log(error);
    }
  };
};

export const addItems = (id, item) => async (dispatch) => {
  const response = await axios.post(`/api/orderItems/${id}/cart`, item);
  const newitem = response.data;
  console.log(item);
  dispatch(addItem(newitem));
};
const OrderItemsReducer = (items = [], action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.OrderItems;
    case ADD_ITEM:
      return [...items, action.item];
    default:
      return items;
  }
};

export default OrderItemsReducer;
