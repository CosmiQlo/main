import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import './auth-form.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="frontpage">
          <div className="mainBox">
            {name === 'signup' ? (
              <div className="choiceContainer">
                <label htmlFor="name">Name: </label>
                <input name="userName" type="text" />
              </div>
            ) : (
              <div className="choiceContainer">
                <span>Have an account? Log in:</span>
              </div>
            )}
            <div className="email">
              <label htmlFor="email">E-mail: </label>
              <input name="email" type="text" />
            </div>
            <div className="pwd">
              <label htmlFor="password">Password: </label>
              <input name="password" type="password" />
            </div>
            <div className="enter" />
            <button type="submit" className="enterbtn">
              {displayName}
            </button>
            <div className="guestorSignup">
              <Link to="/home">Continue as a guest user</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      if (evt.target.userName) {
        const formName = evt.target.name
        const name = evt.target.userName.value
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(name, email, password, formName))
      } else {
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        // it is okay for us to pass in "null" as the name value because this thunk is called for users that are
        // logging in, not signing up. We never use the name value when checking for a user whose email is in the
        // database already!
        dispatch(auth(null, email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
