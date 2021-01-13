import axios from 'axios'

/*** ACTION TYPES ***/
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SPECIFIC_SIZE_PRODUCTS = 'GET_SPECIFIC_SIZE_PRODUCTS'

/*** INITIAL STATE ***/
const initialState = []

/*** ACTION CREATORS ***/
const getProducts = products => ({type: GET_PRODUCTS, products})

const getSpecificSizeProducts = products => ({
  type: GET_SPECIFIC_SIZE_PRODUCTS,
  products
})

/*** THUNK CREATOR ***/
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSpecificSizeProducts = size => async dispatch => {
  try {
    const res = await axios.get(`api/products/${size}`)
    dispatch(getSpecificSizeProducts(res.data))
  } catch (err) {
    console.log(err)
  }
}

/*** REDUCERS ***/
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_SPECIFIC_SIZE_PRODUCTS:
      return action.products
    default:
      return state
  }
}
