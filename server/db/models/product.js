const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  inventory: {
    type: Sequelize.INTEGER
  },
  style: {
    type: Sequelize.ENUM('adults', 'kids')
  },
  price: {
    type: Sequelize.DECIMAL
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
