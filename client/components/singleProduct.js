import React from 'react'
import {connect} from 'react-redux'
import Cart from './cart'
import './singleProduct.css'

import {fetchSingleProduct} from '../store/singleProduct'
import UpdateProduct from './updateProduct'

export class singleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.singleProduct
    const id = this.props.match.params.productId
    return (
      <div className="productscreen">
        <div className="ps_left">
          <img src={product.imageUrl} className="left_image" />
          <div>
            <div className="left_info">
              <p className="left_name">{product.name}</p>
              <p className="left_description">{product.description}</p>
              <p className="left_price">{product.price}</p>
            </div>
          </div>
        </div>
        <div className="ps_right">
          <div className="right_info">
            <p>
              Price <span>{product.price}</span>
            </p>
            <p>
              Status
              {product.inventory > 0 ? (
                <span>In Stock</span>
              ) : (
                <span>Sorry, out of space-stock!</span>
              )}
            </p>
            <p>
              {this.props.user.isAdmin === true ? (
                <UpdateProduct productId={id} />
              ) : product.inventory > 0 ? (
                <button type="button">ADD TO CART</button>
              ) : (
                'sorry, out of space-stock!'
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleProduct)
