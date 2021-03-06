import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchItems,
  addItemThunk,
  removeAll,
  removeOne,
  processOrder
} from '../store/cart'
import completeOrder from './completedOrder'
import './cart.css'

// we ONLY RENDER this component if we have user on state. The statement in user-home.js makes sure this is true.
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addOneToCart = this.addOneToCart.bind(this)
    this.removeAllOfOneItem = this.removeAllOfOneItem.bind(this)
    this.removeOneItem = this.removeOneItem.bind(this)
  }
  componentDidMount() {
    this.props.getItems(this.props.user.id)
  }

  addOneToCart(userId, productId) {
    this.props.addToCart(userId, productId)
  }
  removeAllOfOneItem(userId, productId) {
    this.props.removeAllFromCart(userId, productId)
  }
  removeOneItem(userId, productId) {
    this.props.removeOneFromCart(userId, productId)
  }
  //show the alerbox for now
  handleSubmit(event) {
    event.preventDefault()

    const orderId = this.props.cart[0].orderProduct.orderId
    alert('Your Order has been placed')
    try {
      //process the order- update Order table with
      //status="completed" and orderDate=today's date
      this.props.orderItems(orderId, this.props.user.id)
      //clear the cart
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('cart props:', this.props.cart)
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cartscreen">
          <div className="cs_title">
            <h2>My Cart</h2>
          </div>
          <div className="cs_main">
            <div className="cs_left">
              {!this.props.user.id ? (
                <div>Loading your cart...</div>
              ) : (
                <div className="cs_items">
                  {this.props.cart.map(item => {
                    return (
                      <div key={item.id} className="cs_item">
                        <Link to={`/products/${item.id}`}>
                          <img src={`${item.imageUrl}`} className="image" />
                        </Link>
                        <p className="ci_name">{item.name}</p>
                        <p className="ci_price">$ {item.price}</p>
                        <p className="ci_quantity">
                          Qty:{item.orderProduct.quantity}
                        </p>
                        <p className="addremovebuttons">
                          <button
                            type="button"
                            onClick={() => {
                              this.addOneToCart(this.props.user.id, item.id)
                            }}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              this.removeOneItem(this.props.user.id, item.id)
                            }}
                          >
                            Remove
                          </button>
                        </p>
                        <p className="deletebutton">
                          <i className="fas fa-trash" />
                          <button
                            type="button"
                            onClick={() => {
                              this.removeAllOfOneItem(
                                this.props.user.id,
                                item.id
                              )
                            }}
                          >
                            Remove Item
                          </button>
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="cs_right">
              <div className="cs_info">
                <p>
                  Total Price($):{' '}
                  {this.props.cart.reduce(
                    (acc, item) =>
                      acc + item.orderProduct.quantity * item.price,
                    0
                  )}
                </p>
              </div>
              <div>
                {/* <button type="submit"><Link to="/completedOrder">Checkout</Link></button> */}
                <button type="submit">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
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
    },
    addToCart: (userId, productId) => {
      dispatch(addItemThunk(userId, productId))
    },
    removeAllFromCart: (userId, productId) => {
      dispatch(removeAll(userId, productId))
    },
    removeOneFromCart: (userId, productId) => {
      dispatch(removeOne(userId, productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Cart)
