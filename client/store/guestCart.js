import axios from 'axios'

/*** ACTION TYPES ***/
const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const EMPTY_GUEST_CART = 'EMPTY_GUEST_CART'

/*** INITIAL STATE ***/
const initialState = []

/*** ACTION CREATORS ***/
const addGuestProduct = product => ({type: ADD_GUEST_PRODUCT, product})

const emptyGuestCart = () => ({
  type: EMPTY_GUEST_CART
})

/*** THUNK CREATOR ***/
export const fetchGuestProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(addGuestProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const emptyCart = () => dispatch => {
  try {
    dispatch(emptyGuestCart())
  } catch (err) {
    console.error(err)
  }
}

/*** REDUCERS ***/
export default function guestCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GUEST_PRODUCT:
      return [...state, action.product]
    case EMPTY_GUEST_CART:
      return initialState
    default:
      return state
  }
}
