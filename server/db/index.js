const Sequelize = require('sequelize')
const db = require('./db')

// bring in the models
const Product = require('./models/product')
const User = require('./models/user')
const Order = require('./models/order')
const orderProduct = require('./models/orderProduct')

//Product - Order Associations
Product.belongsToMany(Order, {
  through: orderProduct
})

Order.belongsToMany(Product, {
  through: orderProduct
})

//User and Order Associations

User.hasMany(Order)
Order.belongsTo(User)

//Product and User Associations

Product.belongsToMany(User, {through: 'ProductUser'})
User.belongsToMany(Product, {through: 'ProductUser'})

module.exports = {
  db,
  Product,
  User,
  Order
  // orderProduct,
}
