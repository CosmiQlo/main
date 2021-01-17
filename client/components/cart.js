import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/cart'

// we ONLY RENDER this component if we have user on state. The statement in user-home.js makes sure this is true.
export class Cart extends Component {
  componentDidMount() {
    this.props.getItems(this.props.user.id)
  }

  render() {
    return (
      <div id="myCart">
        <h1>My Cart</h1>
        <div>
          {/* {!this.props.user.id ? (
            <div>Loading your cart...</div>
          ) : ( */}
          <div>
            {this.props.cart.map(item => {
              return (
                <div key={item.id}>
                  <h3>Item: {item.name}</h3>
                  <h4>Price: {item.price}</h4>
                </div>
              )
            })}
          </div>
          {/* )} */}
        </div>
      </div>
    )
    //add a table -
    //the item name, quantity, price, + button, - button, remove all button
    //tax - math problem - for now we'll assume a constant
    //final cost
    //checkout button
  }
}

// we are putting the user and the cart pieces of the redux store onto this component's props
const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: userId => {
      dispatch(fetchItems(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Cart)
