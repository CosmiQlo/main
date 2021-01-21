const router = require('express').Router()
const Order = require('../db/models/order')

//PUT/api/orders/:orderId -
router.put('/:orderId', async (req, res, next) => {
  try {
    //update the order status to "completed" and orderDate="thatDay" for the current order
    const orderId = req.params.orderId

    const order = await Order.findByPk(req.params.orderId)
    await order.update({
      status: 'complete',
      date: new Date()
    })
    res.json(order)
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
