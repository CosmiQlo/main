const Sequelize = require('sequelize')
const db = require('../db')

const orderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL
  }
})

module.exports = orderProduct
