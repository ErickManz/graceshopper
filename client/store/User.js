import axios from 'axios';

const GET_USER = "GET_USER"

const singleUser = (user) =>({
  type:GET_USER,
  user
})

export const getUser = () =>{
  return async (dispatch) =>{
    try {
      const {data} = await axios.get('/auth/me')
      dispatch(singleUser(data));
    }catch(error) {
    console.error(error)
    }
  }
}
const userReducer = (user = {}, action) =>{
  switch(action.type){
    case GET_USER:
      return action.user
    default:
      return user;
  }
}
export default userReducer;
