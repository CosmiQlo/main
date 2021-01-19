import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './slidingcart.css'

const SlidingCart = ({handleToggleCart, show}) => (
  <div className={show ? 'side-drawer open' : 'side-drawer'}>
    <h1>Hello, I'm sliding!</h1>
  </div>
)

const mapState = state => {
  return {
    show: state.slidingCart
  }
}

const mapDispatch = dispatch => {
  return {
    handleToggleCart() {
      dispatch(toggleCart())
    }
  }
}

export default connect(mapState, mapDispatch)(SlidingCart)

/**
 * PROP TYPES
 */
SlidingCart.propTypes = {
  handleToggleCart: PropTypes.func.isRequired
}
