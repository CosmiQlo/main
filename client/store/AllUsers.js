import axios from 'axios'

/*** ACTION TYPES ***/
const GET_USERS = 'GET_USERS'

/*** ACTION CREATORS ***/
const getUsers = users => ({type: GET_USERS, users})

/*** THUNK CREATOR ***/
export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}
/*** INITIAL STATE ***/
const initialState = []

/*** REDUCERS ***/
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users

    default:
      return state
  }
}
