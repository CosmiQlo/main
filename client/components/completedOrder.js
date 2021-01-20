import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import './auth-form.css'

export const completeOrderForm = props => {
  return (
    <div>
      {this.props.user.id
        ? 'Thank you for submotting your order!'
        : 'Thank yuo for order request, please contunie to submit your information.., button '}
    </div>
  )
}
