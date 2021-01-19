import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Products from './products'
import Cart from './cart'
import './user-home.css'
/**
 * COMPONENT
 */

export const UserHome = props => {
  const name = props.user.name

  return (
    <div className="homescreen">
      <h2 className="hs_title">Welcome, {name ? name : 'SpaceWalker!'}!</h2>
      <div className="hs_products">
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

// {/* if we have refreshed the page and there is no user on props yet, we don't load the cart. We only load the cart when we have a user's cart to fetch */}
// {/* {!props.user.id ? (
//   <div>
//     <h6>Loading your cart...</h6>
//   </div>
// ) : (
//   <div>
//     <Cart />
//   </div>
// )} */}
