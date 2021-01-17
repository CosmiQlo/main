import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {
  fetchUpdateSingleProduct,
  fetchSingleProduct
} from '../store/singleProduct'

const defaultState = {
  name: '',
  price: 0,
  inventory: 1
}

let haveNotUpdatedState = true

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = defaultState

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // this is what Ksenia had:
  // componentDidMount() {
  //   this.setState({
  //     // price: this.props.singleProduct.price,
  //     // inventory: this.props.singleProduct.inventory
  //     price: 13,
  //     inventory: 20,
  //   })
  // }

  componentDidMount() {
    console.log('componentDidMount, this.props:', this.props)
    this.props.getProduct(this.props.productId)
  }

  componentDidUpdate() {
    if (
      this.props.singleProduct.id &&
      this.state.name === '' &&
      haveNotUpdatedState
    ) {
      haveNotUpdatedState = false
      this.setState({...this.props.singleProduct})
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const data = {
      name: this.state.name,
      inventory: this.state.inventory,
      price: this.state.price
    }
    this.props.loadUpdateProduct(this.props.productId, data)
    this.setState(defaultState)

    // updateProject(this.props.projectId)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2> Update this product:</h2>
          {/* <ul>
            <li>Name is required</li>
          </ul> */}
          <label htmlFor="name">Products's new name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="inventory">inventory:</label>
          <input
            type="number"
            name="inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
          />
        </div>
        <button className="back" type="submit">
          Update Product!
        </button>
      </form>
    )
  }
}
const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}
const mapDispatch = dispatch => {
  return {
    loadUpdateProduct: (productId, data) =>
      dispatch(fetchUpdateSingleProduct(productId, data)),
    getProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    }
  }
}
export default connect(mapState, mapDispatch)(UpdateProduct)
