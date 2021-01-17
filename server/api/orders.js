const router = require('express').Router()
const Order = require('../db/models/order')

//PUT/api/orders/:orderId -
router.put('/:orderId', async (req, res, next) => {
  try {
    //update the order status to "completed" and orderDate="thatDay" for the current order
    const orderId = req.params.orderId
    console.log('Current Order No', orderId)
    const order = await Order.findByPk(req.params.orderId)
    await order.update({
      status: req.body.status,
      date: req.body.date
    })
    res.json(order)
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
