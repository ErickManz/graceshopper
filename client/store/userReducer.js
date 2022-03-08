import axios from 'axios';

const GET_USER = "GET_USER"

const AllUser = (users) =>({
  type:GET_USER,
  users
})

export const getUsers = () =>{
  return async (dispatch) =>{
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const {data} = await axios.get('/api/users',{headers:{Authorization:token}})
      dispatch(AllUser(data));
    }catch(error) {
    console.error(error)
    }
  }
}

const userState ={
  users:[],
}
const userReducer = (state = userState, action) =>{
  switch(action.type){
    case GET_USER:
      return {...state, users: action.users}
    default:
      return state;
  }
}
export default userReducer;
