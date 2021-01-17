import React from 'react'
import {connect} from 'react-redux'

import {fetchSingleProduct} from '../store/singleProduct'
import UpdateProduct from './updateProduct'

export class singleProduct extends React.Component {
  componentDidMount() {
    // console.log(
    //   'In singleProduct componentDidMount, here is the productId:',
    //   this.props.match.params.productId
    // )
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.singleProduct
    // console.log('singleProduct props:', this.props)
    const id = this.props.match.params.productId
    return (
      <div>
        <h1>{product.name}</h1>
        <h3>{product.price}</h3>
        <p>{product.description}</p>
        {this.props.user.isAdmin === true ? (
          <UpdateProduct productId={id} />
        ) : (
          <div>
            {product.inventory > 0 ? (
              <div>
                <button type="submit">ADD TO CART</button>
              </div>
            ) : (
              'sorry, out of space-stock!'
            )}
          </div>
        )}
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
