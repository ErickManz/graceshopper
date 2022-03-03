import axios from 'axios';

const ADD_ITEM = 'ADD_ITEM';

export const addItem = (item) => ({ type: ADD_ITEM, item });

export const fetchItems = (id, item) => async (dispatch) => {
  const response = await axios.post(`/api/cartitems/${id}/cart`, item);
  const newitem = response.data;
  console.log(newitem);
  dispatch(addItem(newitem));
};

// export const addItem = () => async (dispatch) => {};

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return action.auth;
    default:
      return state;
  }
}
