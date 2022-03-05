import axios from 'axios';

const GET_USER = "GET_USER"
const GET_SINGLE_USER ="GET_SINGLE_USER"

const AllUser = (users) =>({
  type:GET_USER,
  users
})

const SingleUser =(user) => ({
  type:GET_SINGLE_USER,
  user
})

export const getUsers = () =>{
  return async (dispatch) =>{
    try {
      const {data} = await axios.get('/api/users')
      dispatch(AllUser(data));
    }catch(error) {
    console.error(error)
    }
  }
}
export const getUser = (id) => {
  return async (dispatch) =>{
    try{
      const {data} =await axios.get(`api/users/${id}`);
      dispatch(SingleUser(data));
    }catch(error){
      console.error(error);
    }
  }
}
const userState ={
  users:[],
  user:{}
}
const userReducer = (state = userState, action) =>{
  switch(action.type){
    case GET_USER:
      return {users:action.users}
    case GET_SINGLE_USER:
      return {user: action.user}
    default:
      return state;
  }
}
export default userReducer;
