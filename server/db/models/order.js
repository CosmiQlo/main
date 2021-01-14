const Sequelize = require('sequelize')
const db = require('../db')

//user id will come into this table through the association

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('complete', 'pending')
  },
  date: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  total: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Order
