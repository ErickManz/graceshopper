import axios from 'axios';

const GET_USER = "GET_USER"

const AllUser = (user) =>({
  type:GET_USER,
  user
})

export const getUser = () =>{
  return async (dispatch) =>{
    try {
      const {data} = await axios.get('/api/users')
      dispatch(AllUser(data));
    }catch(error) {
    console.error(error)
    }
  }
}
const userReducer = (user = [], action) =>{
  switch(action.type){
    case GET_USER:
      return action.user
    default:
      return user;
  }
}
export default userReducer;
