import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import GuestCart from './guestCart'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn, user, cart, guestCart}) => (
  <div className="navBar">
    <div className="navBar_name">
      <img src="/images/logo.png" className="navBar_logo" />
      <Link to="/home">
        <h2>CosmiQlo</h2>
      </Link>
    </div>
    {isLoggedIn ? (
      <ul className="navBar_links">
        {/* The navbar will show these links after you log in  */}
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </li>
        <li>
          {user.isAdmin === true ? (
            <Link to="/users">Users</Link>
          ) : (
            <Link to="/cart" className="cart_link">
              <i className="fas fa-shopping-cart" />
              Cart
              {/* <span className="cartTotal">
                {cart.reduce(
                  (acc, item) => acc + item.orderProduct.quantity,
                  0
                )}
              </span> */}
            </Link>
          )}
        </li>
      </ul>
    ) : (
      // The navbar will show these links before you log in
      <ul className="navBar_links">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          {' '}
          <Link to="/guestCart" className="cart_link">
            <i className="fas fa-shopping-cart" />
            Cart
            {/* <span className="cartTotal">0</span> */}
          </Link>
        </li>
      </ul>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
