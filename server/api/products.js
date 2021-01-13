const router = require('express').Router()
const {Product} = require('../db/models')
//GET/api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
//GET/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/style/kids', async (req, res, next) => {
  try {
    const productsForKids = await Product.findAll({
      //need to specify what exectly we should return in "include"-img,name etc-shouldnt return the whole product table and extra info
      where: {
        style: 'kids'
      }
    })
    res.json(productsForKids)
  } catch (err) {
    next(err)
  }
})
router.get('/style/adults', async (req, res, next) => {
  try {
    const productsForAdults = await Product.findAll({
      //need to specify what exectly we should return in "include"-img,name etc-shouldnt return the whole product table and extra info
      where: {
        style: 'adults'
      }
    })
    res.json(productsForAdults)
  } catch (err) {
    next(err)
  }
})

module.exports = router
