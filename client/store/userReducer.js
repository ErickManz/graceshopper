import axios from 'axios';

const GET_USER = "GET_USER"
const UPDATE_ROLE = "UPDATE_ROLE"
const AllUser = (users) =>({
  type:GET_USER,
  users
})
const updateRole= (users) =>({
  type:UPDATE_ROLE,
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
export const editUser = (id, info) => {
  return async (dispatch) =>{
    try{
      const token = localStorage.getItem("token");
       await axios.patch(`/api/users/${id}/update`, info,{headers:{Authorization:token}});
      const {data} = await axios.get('/api/users',{headers:{Authorization:token}})
      dispatch(updateRole(data));
    }catch(error){
      console.error(error);
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
    case UPDATE_ROLE:
      return {...state, users: action.users}
    default:
      return state;
  }
}
export default userReducer;
