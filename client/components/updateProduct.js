import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {
  fetchUpdateSingleProduct,
  fetchSingleProduct
} from '../store/singleProduct'
import removeProduct from '../store/products'
import './updateProduct.css'

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
  }

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  render() {
    return (
      <div>
        {' '}
        <form onSubmit={this.handleSubmit}>
          <div className="updatebox">
            <div className="update_title">Update</div>
            <div className="update_name">
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="update_price">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
            <div className="update_inventory">
              <label htmlFor="inventory">Inventory:</label>
              <input
                type="number"
                name="inventory"
                value={this.state.inventory}
                onChange={this.handleChange}
              />
            </div>
            <div className="update_description" />
            <div className="updateBtn">
              <button className="back" type="submit">
                Update Product!
              </button>
            </div>
          </div>
        </form>
        {/* here we can implement delete button, doent work yet, but i already wrote a reducer and route on the back-end for that */}
        {/* <button className="del" onClick={() => this.handleRemove(this.props.singleProduct.id)} type="button" >X {this.props.singleProduct.name}</button> */}
      </div>
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
    },
    removeProduct: productId => dispatch(removeProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(UpdateProduct)
