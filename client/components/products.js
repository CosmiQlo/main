import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchProducts} from '../store/products'
import {addItemThunk} from '../store/cart'
import {fetchGuestProduct} from '../store/guestCart'

import './products.css'

export class Products extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
    this.addToGuestCart = this.addToGuestCart.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  addToCart(userId, productId) {
    this.props.addItemToCart(userId, productId)
  }
  addToGuestCart(productId) {
    this.props.addItemToGuestCart(productId)
  }
  render() {
    // we have something called this.props.products
    // console.log('In render, props =', this.props)
    return (
      <div className="all_products">
        {this.props.products.map(product => {
          return (
            // this could be where we make the product.name a LINK that goes to single product view, etc.
            <div key={product.id} className="product">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} />
              </Link>
              <div className="product_info">
                <p className="info_name">{product.name}</p>
                <p className="info_descr">{product.description}</p>
                <p className="info_price">{product.price}</p>
                {this.props.user.isAdmin === true ? (
                  <Link
                    to={`/products/${product.id}`}
                    productId={product.id}
                    className="buy_button"
                  >
                    {/* comment out productId? */}
                    EDIT
                  </Link>
                ) : product.inventory > 0 ? (
                  <button
                    type="button"
                    className="buy_button"
                    onClick={() => {
                      if (!this.props.user.id) {
                        this.addToGuestCart(product.id)
                      } else {
                        this.addToCart(this.props.user.id, product.id)
                      }
                    }}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  'Sorry, out of space-stock!'
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch(fetchProducts())
    },
    addItemToCart: (userId, productId) => {
      dispatch(addItemThunk(userId, productId))
    },
    addItemToGuestCart: productId => {
      dispatch(fetchGuestProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
