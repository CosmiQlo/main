const router = require('express').Router()
module.exports = router
//not using this yet
router.use('/users', require('./users'))
//we're using for everyone, not logged in
router.use('/products', require('./products'))
//cart routes:
router.use('/cart', require('./cart'))
//order routes:
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
