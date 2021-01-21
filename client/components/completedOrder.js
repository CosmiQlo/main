import React from 'react'
import {connect} from 'react-redux'

const completeOrder = ({user}) => {
  return (
    <div>
      {user.id
        ? 'Thank you for submitting your order!'
        : 'Thank you for order request, please continue to filling out the form:'}
    </div>
  )
}
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(completeOrder)
