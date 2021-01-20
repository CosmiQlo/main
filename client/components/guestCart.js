import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {emptyCart, removeItem} from '../store/guestCart'
//import {processOrder} from '../store/cart'
import './cart.css'

// we ONLY RENDER this component if we have user on state. The statement in user-home.js makes sure this is true.
export class GuestCart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}
  //show the alerbox for now
  handleSubmit(event) {
    event.preventDefault()

    alert('Your Order has been placed')
    try {
      this.props.emptyGuestCart()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cartscreen">
          <div className="cs_title">
            <h2>My Cart</h2>
          </div>
          <div className="cs_main">
            <div className="cs_left">
              <div className="cs_items">
                {this.props.guestCart.map(item => {
                  return (
                    <div key={item.id} className="cs_item">
                      <Link to={`/products/${item.id}`}>
                        <img src={`${item.imageUrl}`} />
                      </Link>
                      <p className="ci_name">{item.name}</p>
                      <p className="ci_price">$ {item.price}</p>
                      <p className="ci_quantity">Qty:1</p>
                      {/* <p className="addremovebuttons">
                        <button type="button">Add</button>
                        <button type="button">Remove</button>
                      </p> */}
                      <p className="deletebutton">
                        <i className="fas fa-trash" />
                        <button
                          type="button"
                          onClick={() => {
                            this.props.removeOneItem(item.id)
                          }}
                        >
                          Remove Item
                        </button>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="cs_right">
              <div className="cs_info">
                {/* <p>
                  Total Price($):{' '}
                  {this.props.cart.reduce(
                    (acc, item) =>
                      acc + item.orderProduct.quantity * item.price,
                    0
                  )}
                </p> */}
              </div>
              <div>
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
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    emptyGuestCart: () => {
      dispatch(emptyCart())
    },
    removeOneItem: productId => {
      dispatch(removeItem(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(GuestCart)
