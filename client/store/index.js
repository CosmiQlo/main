import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleProduct from './singleProduct'
import cart from './cart'
import allUsers from './AllUsers'
import guestCart from './guestCart'

const reducer = combineReducers({
  user,
  products,
  singleProduct,
  cart,
  allUsers,
  guestCart
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
