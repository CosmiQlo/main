import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchProducts} from '../store/products'
import {addItemThunk} from '../store/cart'

export class Products extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  addToCart(userId, productId) {
    this.props.addItemToCart(userId, productId)
  }

  render() {
    // we have something called this.props.products
    // console.log('In render, props =', this.props)
    return (
      <div>
        {this.props.products.map(product => {
          return (
            // this could be where we make the product.name a LINK that goes to single product view, etc.
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div>
                  <h1>{product.name}</h1>
                  <img src={product.imageUrl} />
                  <div>{product.inventory}</div>
                </div>
              </Link>
              {this.props.user.isAdmin === true ? (
                <Link to={`/products/${product.id}`} productId={product.id}>
                  {/*comment out productId?*/}
                  EDIT
                </Link>
              ) : (
                <div>
                  {product.inventory > 0 ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          this.addToCart(this.props.user.id, product.id)
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  ) : (
                    'Sorry, out of space-stock!'
                  )}
                </div>
              )}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
