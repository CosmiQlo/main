import React from 'react'
import {connect} from 'react-redux'

import {fetchSingleProduct} from '../store/singleProduct'

export class singleProduct extends React.Component {
  componentDidMount() {
    // console.log(
    //   'In singleProduct componentDidMount, here is the productId:',
    //   this.props.match.params.productId
    // )
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    // console.log('singleProduct props:', this.props)
    return (
      <div>
        <h1>{this.props.singleProduct.name}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
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
