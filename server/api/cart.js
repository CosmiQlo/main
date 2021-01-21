const router = require('express').Router()
// const {Product} = require('../db/models/product')
const Product = require('../db/models/product')
const Order = require('../db/models/order')
const User = require('../db/models/user')
const orderProduct = require('../db/models/orderProduct')
const {isRightUser} = require('./middleware')

//GET/api/cart/userId - gets us the products in the order that is pending (there should only be one pending order, because we don't have a feature where someone can build multiple carts
//returns an array of the products in that order
router.get('/:userId', isRightUser, async (req, res, next) => {
  try {
    let userId = req.params.userId
    userId = parseInt(userId)
    const currentUser = await User.findByPk(userId)
    const userOrder = await currentUser.getOrders({
      where: {
        status: 'pending'
      }
    })

    let products = []
    if (userOrder.length > 0) {
      products = await userOrder[0].getProducts()
    }
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//ADD/api/cart/:userId - adds an item to active user's cart
router.post('/:userId', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId)
    const productId = parseInt(req.body.productId)
    const currentUser = await User.findByPk(userId)
    const productToAdd = await Product.findByPk(productId)

    let pendingOrders = await currentUser.getOrders({
      where: {
        status: 'pending'
      }
    })

    let thisOrderId = 0
    // let theOrder = {}

    if (!pendingOrders.length) {
      // if User does not currently have any active orders, create a new one and add this product to it:
      let newOrder = await Order.create({
        status: 'pending',
        date: new Date(),
        total: productToAdd.price
      })
      await newOrder.addProduct(productToAdd)
      await currentUser.addOrder(newOrder)
      thisOrderId = newOrder.id
      // theOrder = newOrder
    } else {
      // isolate the active order and add this product to it:
      let currentOrder = pendingOrders[0]

      // check to see if this user ALREADY has one of these items in their order...
      let productAlreadyInOrder = currentOrder.getProducts({
        where: {
          id: productId
        }
      })
      if (!productAlreadyInOrder.length) {
        // product is not in the order yet
        await currentOrder.addProduct(productToAdd)
        currentOrder.total += productToAdd.price
        await currentOrder.save()
      }
      thisOrderId = currentOrder.id
      // theOrder = currentOrder
    }
    let currentOrderProductRow = await orderProduct.findOne({
      where: {
        orderId: thisOrderId,
        productId: productId
      }
    })
    if (currentOrderProductRow.quantity) {
      currentOrderProductRow.quantity++
    } else {
      currentOrderProductRow.quantity = 1
    }
    currentOrderProductRow.price = productToAdd.price

    await currentOrderProductRow.save()

    // let returnVal = await theOrder.getProducts()
    // res.json(returnVal)
    res.json(productToAdd)
  } catch (error) {
    next(error)
  }
})

//ADD/api/cart/remove/items/:productId - adds an item to active user's cart
router.put('/remove/items/:productId', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId)
    const userId = parseInt(req.body.userId)
    const currentUser = await User.findByPk(userId)

    let pendingOrders = await currentUser.getOrders({
      where: {
        status: 'pending'
      }
    })
    let currentOrder = pendingOrders[0]

    const thisOrderId = currentOrder.id

    await orderProduct.destroy({
      where: {
        orderId: thisOrderId,
        productId: productId
      }
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

//remove One Item from the cart
router.put('/remove/item/:productId', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId)
    const userId = parseInt(req.body.userId)
    const currentUser = await User.findByPk(userId)

    let pendingOrders = await currentUser.getOrders({
      where: {
        status: 'pending'
      }
    })
    let currentOrder = pendingOrders[0]

    const thisOrderId = currentOrder.id

    const itemQtyToBeReduced = await orderProduct.findOne({
      where: {
        orderId: thisOrderId,
        productId: productId
      }
    })
    if (itemQtyToBeReduced.quantity === 1) {
      await itemQtyToBeReduced.destroy()
    } else {
      itemQtyToBeReduced.quantity--
      await itemQtyToBeReduced.save()
    }

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
