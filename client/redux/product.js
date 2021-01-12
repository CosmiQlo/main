import axios from 'axios'

/*** ACTION TYPES ***/
const GET_PRODUCT = 'GET_PRODUCT'

/*** INITIAL STATE ***/
const defaultProduct = {}

/*** ACTION CREATORS ***/
const getProduct = product => ({type: GET_PRODUCT, product})

/*** THUNK CREATOR ***/
export const fetchProDuct = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

/*** REDUCERS ***/
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
