import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Products from './products'
import Cart from './cart'
import {me} from '../store/user'
/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log('USER NAME PROPS:', props)

  const name = props.user.name

  return (
    <div>
      <h3>Welcome, {name ? name : 'SpaceWalker!'}</h3>
      {/* we put cart on top just because we are working on it and don't want to have to scroll all the way down */}
      <Cart loadUser={props.loadUser} />
      <Products />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // name: state.user.name,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
