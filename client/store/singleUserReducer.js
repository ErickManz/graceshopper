import axios from 'axios';

const GET_SINGLE_USER ="GET_SINGLE_USER"
const UPDATE_USER = "UPDATE_USER"

const SingleUser =(user) => ({
  type:GET_SINGLE_USER,
  user
})

const updateUser = (user) =>({
  type:UPDATE_USER,
  user
})

export const getUser = (id) => {
  return async (dispatch) =>{
    try{
      const {data} =await axios.get(`/api/users/${id}`);
      dispatch(SingleUser(data));
    }catch(error){
      console.error(error);
    }
  }
}
export const editUser = (id, info) => {
  return async (dispatch) =>{
    try{
      console.log(info);
      const {data} =await axios.put(`/api/users/${id}/update`, info);
      dispatch(updateUser(data));
    }catch(error){
      console.error(error);
    }
  }
}
const singleUserReducer = (state = {}, action) =>{
  switch(action.type){
    case GET_SINGLE_USER:
      return action.user
    case UPDATE_USER:
      return action.user
    default:
      return state;
  }
}
export default singleUserReducer;
