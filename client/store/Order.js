import axios from 'axios';
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const NEW_ORDER = 'NEW_ORDER;'
const EDIT_ORDER = 'EDIT_ORDER'

export const setItems = (OrderItems) => ({
  type: SET_ITEMS,
  OrderItems,
});

export const addItem = (OrderItem) => ({ type: ADD_ITEM, OrderItem });

const newOrder = () => ({type: NEW_ORDER})

export const changeItems = (OrderItems) => ({
  type: SET_ITEMS,
  OrderItems,
});
export const getItems = (id) => {
  return async (dispatch) => {
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

export const addItems = (id, item) => {
   return async (dispatch) => {
     try{
      const response = await axios.post(`/api/orderItems/${id}/cart`, item);
      const newitem = response.data;
      dispatch(addItem(newitem));
     }catch(err){
       console.log(err);
     }
  };
}
export const editItems = (id, item) => {
  return async (dispatch) => {
    try{
     const {data} = await axios.patch(`/api/orderItems/${id}/cart`, item);
     dispatch(changeItems(data));
    }catch(err){
      console.log(err);
    }
 };
}
export const submitOrder = (userId) => async (dispatch) => {
  const response = await axios.patch(`/api/orders/${userId}`)
  const {orderId} = response.data
  dispatch(newOrder())
}
const OrderItemsReducer = (items = [], action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.OrderItems;
    case ADD_ITEM:
      return [...items, action.OrderItem];
    case NEW_ORDER:
      return [];
    case EDIT_ORDER:{
     return items.map(item => {
        if(item.id === action.OrderItems.id){
        return action.OrderItems
        }else
        return item
      })

    }
    default:
      return items;
  }
};

export default OrderItemsReducer;
