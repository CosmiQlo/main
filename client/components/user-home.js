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
