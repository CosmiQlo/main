/* eslint-env mocha, chai */

const {expect} = require('chai')
const {db} = require('../db/db')
const {Product} = require('../db/models')

describe('Product model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `name` and `description`', async () => {
      const swimsuit = await Product.create({
        name: 'Space swimsuit',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde ipsum velit perspiciatis numquam veniam pariatur dolores itaque vitae libero eaque, voluptatum vel quam suscipit tempore beatae quas quod cumque fugit.'
      })

      expect(swimsuit.name).to.equal('swimsuit')
      expect(swimsuit.description).to.deep.equal(
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde ipsum velit perspiciatis numquam veniam pariatur dolores itaque vitae libero eaque, voluptatum vel quam suscipit tempore beatae quas quod cumque fugit.'
      )
    })

    it('`name` is required', async () => {
      const product = Product.build()
      return product.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })

  describe('instance method: getPrice', () => {
    it('should be an integer', async () => {
      const puppa = await Product.create({
        name: 'Puppa-suit',
        price: 15.99
      })

      const dress = await Product.create({
        name: 'Universal Dress',
        price: 1000.89
      })

      expect(puppa.getPrice()).to.equal(15.99)
      expect(dress.getPrice()).to.equal(1000.89)
    })
  })
})
