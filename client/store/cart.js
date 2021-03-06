import axios from 'axios'

/*** ACTION TYPES ***/
const ADD_ITEM = 'ADD_ITEM'
const GET_ITEMS = 'GET_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS'
const ORDER_ITEMS = 'ORDER_ITEMS'

/*** INITIAL STATE ***/
const initialState = []

/*** ACTION CREATORS ***/
// currently unnecessary >>>
const addItem = item => ({
  type: ADD_ITEM,
  payload: item
})
//^^^^^^^^^^^^^^^^^^^^^^^^^

const getItems = items => ({
  type: GET_ITEMS,
  payload: items
})

const orderItems = (orderId, status, date) => ({
  type: 'ORDER_ITEMS',
  payload: orderId,
  status,
  date
})

/*** THUNK CREATOR ***/
export const fetchItems = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${userId}`)
    // res.data is an array of items (the products in the order)
    dispatch(getItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const processOrder = (orderId, userId) => async dispatch => {
  try {
    await axios.put(`/api/orders/${orderId}`)
    const res = await axios.get(`/api/cart/${userId}`)
    // res.data is an array of items (the products in the order)
    dispatch(getItems(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const addItemThunk = (userId, productId) => async dispatch => {
  try {
    //check if itemId already exists - *****COME BACK HERE FIRST AFTER SETTING UP BACKEND******
    const res = await axios.post(`/api/cart/${userId}`, {productId})
    // dispatch(addItem(res.data))

    const res2 = await axios.get(`/api/cart/${userId}`)
    // res.data is an array of items (the products in the order)
    dispatch(getItems(res2.data))
  } catch (err) {
    console.error(err)
  }
}

export const removeAll = (userId, productId) => async dispatch => {
  try {
    await axios.put(`/api/cart/remove/items/${productId}`, {
      userId
    })
    const res = await axios.get(`/api/cart/${userId}`)
    // res.data is an array of items (the products in the order)
    dispatch(getItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const removeOne = (userId, productId) => async dispatch => {
  try {
    await axios.put(`/api/cart/remove/item/${productId}`, {
      userId
    })
    const res = await axios.get(`/api/cart/${userId}`)
    // res.data is an array of items (the products in the order)
    dispatch(getItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

//thunk for the POST - adding a new item to the cart - it should go find the item in the Products list by ID and add one to the item.quantity

/*
function addToCart (cart, item)

- check if item is already in cart, if so, then we just increase the quantity. if not, we need to add it and create the .quantity of that item.
for remove -

*/

/*** REDUCERS ***/
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload]
    case GET_ITEMS:
      return action.payload
    case ORDER_ITEMS:
      return [...state]
    case REMOVE_ITEM:
      return action.payload
    case REMOVE_ALL_ITEMS:
      return action.payload

    default:
      return state
  }
}
