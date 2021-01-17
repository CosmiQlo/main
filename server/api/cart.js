const router = require('express').Router()
// const {Product} = require('../db/models/product')
const Order = require('../db/models/order')
const User = require('../db/models/user')
const orderProducts = require('../db/models/orderProduct')

//GET/api/cart/userId - gets us the products in the order that is pending (there should only be one pending order, because we don't have a feature where someone can build multiple carts
//returns an array of the products in that order
router.get('/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
    userId = parseInt(userId)
    const currentUser = await User.findByPk(userId)
    const userOrder = await currentUser.getOrders({
      where: {
        status: 'pending'
      }
    })
    // console.log('userOrder:', userOrder)
    // console.log('order.getProducts', await userOrder[0].getProducts())
    let products = []
    if (userOrder.length > 0) {
      products = await userOrder[0].getProducts()
    }
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//ADD/api/cart - adds an item to cart
router.post('/', async (req, res, next) => {
  try {
    const item = await Order.create(
      // {
      // status: req.body.status,
      // date: req.body.date,
      // total: req.body.total,
      // userId:req.body.userId
      // }
      req.body
    )
    res.json(item)
  } catch (error) {
    next(error)
  }
})

/*
//deleteOne/api/cart - deletes ONE item to cart
router.put('/:itemId', async (req, res, next) => {
  try {
    const item = await Order.update(
      {
        where: {id: req.params.itemId},
      }
      //find item.quantity (in the OP through table) and subtract one. If Zero, then delete item?
    )
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//deleteAll/api/cart - deletes the entire item to cart
router.delete('/:itemId', async (req, res, next) => {
  try {
    const item = await OP.destroy({
      where: {id: req.params.itemId},
    })
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//deletecart/Clear ALL
*/

module.exports = router
