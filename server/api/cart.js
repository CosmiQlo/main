const router = require('express').Router()
// const {Product} = require('../db/models/product')
const Product = require('../db/models/product')
const Order = require('../db/models/order')
const User = require('../db/models/user')
const orderProduct = require('../db/models/orderProduct')

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
// let potentialReturnVal = await Product.findOne({
//   where: {
//     id: productId,
//   },
//   include: [
//     {
//       model: Order,
//       where: {
//         id: thisOrderId,
//       },
//     },
//   ],
// })
// console.log('is this what we want to return?', potentialReturnVal)
// res.sendStatus(200)
// res.json(potentialReturnVal)

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
