const Product = require('./product')
const User = require('./user')
const Order = require('./order')
const orderProduct = require('./orderProduct')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

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
  User,
  Product,
  Order,
  orderProduct
}
