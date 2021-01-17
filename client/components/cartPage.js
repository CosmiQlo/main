import React from 'react'
import {connect} from 'react-redux'

import Cart from './cart'

export const CartPage = props => {
  console.log('props', props)
  return <div>{!props.user.id ? <h4>Loading your cart...</h4> : <Cart />}</div>
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(CartPage)
