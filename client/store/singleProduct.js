import axios from 'axios'

/*** ACTION TYPES ***/
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/*** INITIAL STATE ***/
const initialState = {}

/*** ACTION CREATORS ***/
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

/*** THUNK CREATOR ***/
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUpdateSingleProduct = (productId, data) => async dispatch => {
  try {
    console.log('this is reducer')
    const res = await axios.put(`/api/products/${productId}/update`, data)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

/*** REDUCERS ***/
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
