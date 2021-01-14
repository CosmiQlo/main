import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Products from './products'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props

  return (
    <div>
      <h3>Welcome, {name ? name : 'SpaceWalker!'}</h3>
      <Products />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
