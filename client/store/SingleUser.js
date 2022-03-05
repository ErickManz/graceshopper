import axios from 'axios';

const GET_SINGLE_USER ="GET_SINGLE_USER"

const SingleUser =(user) => ({
  type:GET_SINGLE_USER,
  user
})

export const getUser = (id) => {
  return async (dispatch) =>{
    try{
      const {data} =await axios.get(`api/users/${id}`);
      console.log(data);
      dispatch(SingleUser(data));
    }catch(error){
      console.error(error);
    }
  }
}
const singleUserReducer = (state = {}, action) =>{
  switch(action.type){
    case GET_SINGLE_USER:
      return action.user
    default:
      return state;
  }
}
export default singleUserReducer;
