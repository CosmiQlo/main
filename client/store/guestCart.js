import axios from 'axios'

/*** ACTION TYPES ***/
const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const EMPTY_GUEST_CART = 'EMPTY_GUEST_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

/*** INITIAL STATE ***/
const initialState = []

/*** ACTION CREATORS ***/
const addGuestProduct = product => ({type: ADD_GUEST_PRODUCT, product})

const emptyGuestCart = () => ({
  type: EMPTY_GUEST_CART
})

export const removeItem = productId => {
  return {
    type: REMOVE_ITEM,
    payload: productId
  }
}

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

// export const removeItem = (productId) => dispatch => {

// }

/*** REDUCERS ***/
export default function guestCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GUEST_PRODUCT:
      return [...state, action.product]
    case EMPTY_GUEST_CART:
      return initialState
    case REMOVE_ITEM:
      let newState = []
      let foundOne = false
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload && !foundOne) {
          foundOne = true
        } else {
          newState.push(state[i])
        }
      }
      return newState
    default:
      return state
  }
}
