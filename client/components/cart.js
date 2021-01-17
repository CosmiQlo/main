import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchItems, processOrder} from '../store/cart'
//import {processOrder} from '../store/cart'

// we ONLY RENDER this component if we have user on state. The statement in user-home.js makes sure this is true.
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getItems(this.props.user.id)
  }
  //show the alerbox for now
  async handleSubmit(event) {
    event.preventDefault()
    console.log('cart orderId', this.props.cart[0].orderProduct.orderId)
    const orderId = this.props.cart[0].orderProduct.orderId
    alert('Your Order has been placed')
    try {
      //process the order- update Order table with
      //status="completed" and orderDate=today's date
      await this.props.orderItems(orderId, 'complete', new Date())
      //clear the cart
      this.props.getItems(this.props.user.id)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('cart props:', this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <div id="myCart">
          <h1>My Cart</h1>
          <div>
            {!this.props.user.id ? (
              <div>Loading your cart...</div>
            ) : (
              <div>
                {this.props.cart.map(item => {
                  return (
                    <div key={item.id}>
                      <h3>Item: {item.name}</h3>
                      <h4>Price: {item.price}</h4>
                      <p>
                        Qty:{item.orderProduct.quantity}
                        <button type="button">add</button>
                        <button type="button">remove</button>
                      </p>
                      <button type="button">Remove Item</button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <button type="submit">Place Order</button>
        </div>
      </form>
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
    },
    orderItems: (orderId, status, date) => {
      dispatch(processOrder(orderId, status, date))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Cart)
