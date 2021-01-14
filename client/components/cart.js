import React, {Component} from 'react'
import {connect} from 'react-redux'

export class cart extends Component {
  render() {
    return <div>My cart</div>
    //add a table -
    //the item name, quantity, price, + button, - button, remove all button
    //tax - math problem - for now we'll assume a constant
    //final cost
    //checkout button
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatch = dispatch => {
  //bring in add, remove and remove all reducers?
}

export default connect(mapStateToProps, mapDispatch)(cart)
