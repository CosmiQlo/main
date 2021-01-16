'use strict'

const db = require('../server/db')
const {User, Product, Order, orderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', name: 'Cody'}),
    User.create({email: 'murphy@email.com', password: '123', name: 'Murphy'}),
    User.create({email: 'laura@apple.com', password: '12345', name: 'Laura'}),
    User.create({email: 'ksenia@apple.com', password: '12345', name: 'Ksenia'}),
    User.create({
      email: 'spandana@apple.com',
      password: '12345',
      name: 'Spandana'
    }),
    User.create({email: 'ruchi@apple.com', password: '12345', name: 'Ruchi'}),
    User.create({
      email: 'admin@apple.com',
      password: '123456',
      name: 'Admin',
      isAdmin: true
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: "Children's Space Suit",
      imageUrl:
        'https://hips.hearstapps.com/pop.h-cdn.co/assets/15/23/1024x1024/square-1433360107-nasa-spacesuit.jpg?resize=980:*',
      quantity: 50,
      style: 'kids',
      price: 49.99,
      description:
        'Send your child to Moon school in this stylish, breathable onesie!'
    }),
    Product.create({
      name: 'Space suit wedding dress',
      imageUrl:
        'https://hips.hearstapps.com/pop.h-cdn.co/assets/15/23/1024x1024/square-1433360107-nasa-spacesuit.jpg?resize=980:*',
      quantity: 20,
      style: 'adults',
      price: 1099.99,
      description:
        'The only article of clothing appropriate for a destination wedding on Mars.'
    }),
    Product.create({
      name: 'Sports uniform',
      imageUrl:
        'https://hips.hearstapps.com/pop.h-cdn.co/assets/15/23/1024x1024/square-1433360107-nasa-spacesuit.jpg?resize=980:*',
      quantity: 150,
      style: 'kids',
      price: 29.99,
      description:
        'A stylish and practical sports outfit for your child who plays contact sports on the moon.'
    }),
    Product.create({
      name: 'Space Pajamas',
      imageUrl:
        'https://hips.hearstapps.com/pop.h-cdn.co/assets/15/23/1024x1024/square-1433360107-nasa-spacesuit.jpg?resize=980:*',
      quantity: 30,
      style: 'adults',
      price: 39.99,
      description: 'Everyone needs something to sleep in, even in zero-gravity!'
    }),
    Product.create({
      name: 'Space jeans',
      imageUrl:
        'https://hips.hearstapps.com/pop.h-cdn.co/assets/15/23/1024x1024/square-1433360107-nasa-spacesuit.jpg?resize=980:*',
      quantity: 1000,
      style: 'adults',
      price: 15.99,
      description:
        'Who know that jeans for outer space would be so affordable? Made of a material FAR more comfortable than denim!'
    })
  ])

  const order1 = await Order.create({
    status: 'pending',
    date: new Date(),
    total: 100.0
  })
  const order2 = await Order.create({
    status: 'pending',
    date: new Date(),
    total: 200.0
  })

  console.log(
    'printing Order magic methods:',
    Object.keys(Order.prototype)
    // Object.keys(Order.prototype),
    // Object.keys(orderProduct.prototype),
    // Object.keys(User.prototype)
  )

  // user logs in, backend retrieves userId and all relevant user data
  const someUser = await User.findByPk(1)
  // once user adds something to cart, create order
  // BETTER: only create order when user hits "submit"
  // redux state that is keeping track of what products are in the cart, so we know what to send when the user hits submit

  // PAUSE HERE
  await someUser.addOrder(order1)

  const product1 = await Product.findByPk(1)
  const product2 = await Product.findByPk(2)
  await order1.addProducts([product1, product2])

  console.log('order 1 with products added:', await order1.getProducts())

  // const someUser = await User.findByPk(1)
  // // console.log('here is someUser before we add an order:', someUser)
  // await someUser.addOrder(order1)
  // await someUser.addOrder(order2)

  // console.log(
  //   'user order 1:',
  //   await someUser.getOrders({
  //     where: {
  //       id: 1,
  //     },
  //   })
  // )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
