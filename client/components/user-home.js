import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Products from './products'
import Cart from './cart'
/**
 * COMPONENT
 */

export const UserHome = props => {
  const name = props.user.name

  return (
    <div>
      <h3>Welcome, {name ? name : 'SpaceWalker!'}</h3>
      <div>
        {/* if we have refreshed the page and there is no user on props yet, we don't load the cart. We only load the cart when we have a user's cart to fetch */}
        {/* {!props.user.id ? (
          <div>
            <h6>Loading your cart...</h6>
          </div>
        ) : (
          <div>
            <Cart />
          </div>
        )} */}
        <Products />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
