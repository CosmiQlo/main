import React from 'react'
import {connect} from 'react-redux'

import {fetchProducts} from '../store/products'

export class Products extends React.Component() {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    // we have something called this.props.products
    console.log('In render, props =', this.props)
    return (
      <div>
        {this.props.products.map(product => {
          return (
            // this could be where we make the product.name a LINK that goes to single product view, etc.
            <div key={product.id}>
              <h1>{product.name}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
