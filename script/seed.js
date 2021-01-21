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
      name: 'Intergalactic Active Wear Onepiece',
      imageUrl: 'images/active_outfit.jpg',
      inventory: 50,
      style: 'adults',
      price: 89.99,
      description:
        "The sun never sets on the outer rings of Saturn, which means it's always a good time to be at the gym, bulking up, in this adult jumpsuit."
    }),
    Product.create({
      name: 'Alien Fan Matched Set',
      imageUrl: 'images/alien_logo_outfit.jpg',
      inventory: 20,
      style: 'adults',
      price: 79.99,
      description:
        "Show your extraterrestrial neighbors how much you admire them, by wearing their image. They'll love it, maybe!"
    }),
    Product.create({
      name: 'Cosmic Cocktail Attire',
      imageUrl: 'images/ballgown1.jpg',
      inventory: 150,
      style: 'adults',
      price: 299.99,
      description:
        "Another weird office party at Moonbase 5991R3Z? You don't have to like your coworkers, but you'll definitely dazzle them in this getup."
    }),
    Product.create({
      name: 'Black Tie Affair Gown',
      imageUrl: 'images/ballgown2.jpg',
      inventory: 20,
      style: 'adults',
      price: 499.99,
      description:
        "Are you hosting the Interstellar Music Awards Show? Don't even think of wearing something other than this."
    }),
    Product.create({
      name: 'Business-Martian Suit',
      imageUrl: 'images/business_suit.jpg',
      inventory: 1000,
      style: 'adults',
      price: 89.99,
      description:
        "You COULD go to that job interview in your old suit...or you could wear this, and earn a promotion before you're even hired."
    }),
    Product.create({
      name: 'Everyday Cape Look',
      imageUrl: 'images/cape_outfit.jpg',
      inventory: 1500,
      style: 'adults',
      price: 69.99,
      description:
        "Finally, an outfit that is both highly reflective AND makes you look like you are an ice-pack inside of an earthling's lunchbox."
    }),
    Product.create({
      name: 'Casual Shift Dress',
      imageUrl: 'images/casual_dress.jpg',
      inventory: 3500,
      style: 'adults',
      price: 49.99,
      description:
        'Is it shapeless? Yes. Is it functional? You bet. Go on, buy eight of them.'
    }),
    Product.create({
      name: 'Sleek Everyday Ensemble',
      imageUrl: 'images/chic_shirt_pants.jpg',
      inventory: 1000,
      style: 'adults',
      price: 39.99,
      description:
        "Sunglasses not included in the outfit. But this model's swagger absolutely is."
    }),
    Product.create({
      name: 'Retro Spacesuit',
      imageUrl: 'images/classic_mens.jpg',
      inventory: 3500,
      style: 'adults',
      price: 99.99,
      description:
        'Obviously, because of the advancement in atmospherization, humans no longer need suits like this to chill up here in space. But sometimes, you gotta rock that throw-back look.'
    }),
    Product.create({
      name: 'High-Fashion Globe Outfit',
      imageUrl: 'images/classic.jpg',
      inventory: 1500,
      style: 'adults',
      price: 659.99,
      description:
        'You think you look good now? Just wait until you see yourself inside these conjoined fishbowls.'
    }),
    Product.create({
      name: 'Trio Of Power Looks',
      imageUrl: 'images/cut_right.jpg',
      inventory: 500,
      style: 'adults',
      price: 4399.99,
      description:
        'Three unique looks that transition you from day-to-night--or, as those of us who live on the dark side of the Moon call them, night-to-even-more-night.'
    }),
    Product.create({
      name: 'Eye-Catching Minidress',
      imageUrl: 'images/full_cover_white.jpg',
      inventory: 200,
      style: 'adults',
      price: 29.99,
      description:
        'You may think, "This outfit will make me look like my head is one big eyeball." And our response to that is, "Yes, and you\'re very welcome."'
    }),
    Product.create({
      name: 'Head-To-Toe Chic',
      imageUrl: 'images/full_dress_outfit.jpg',
      inventory: 100,
      style: 'adults',
      price: 120.99,
      description:
        'We did all the work for you, assembling this one--all you have to do is put it on and get ready to accept compliments.'
    }),
    Product.create({
      name: 'Ready-For-Anything Jumpsuit',
      imageUrl: 'images/jumpsuit.jpg',
      inventory: 1900,
      style: 'adults',
      price: 75.99,
      description:
        'You are not required to wear your hair like this in order to wear this piece but, honestly, we recommend it.'
    }),
    Product.create({
      name: 'Tot Helmet',
      imageUrl: 'images/kids1.jpg',
      inventory: 800,
      style: 'kids',
      price: 19.99,
      description:
        'Your kid will look darling in this--but also, the helmet is entirely soundproof. Pop this bad boy on mid-tantrum and keep on stargazing, honey.'
    }),
    Product.create({
      name: 'XTREME Kiddo Headset',
      imageUrl: 'images/kids2.jpg',
      inventory: 300,
      style: 'kids',
      price: 49.99,
      description:
        "Ever wanted your offspring to look more like an insect while they listen to thier space jams? We've got you covered."
    }),
    Product.create({
      name: "Children's Wearable Sleeping Bag",
      imageUrl: 'images/kids3.jpg',
      inventory: 900,
      style: 'kids',
      price: 59.99,
      description:
        "Don't think twice about zipping your little one into this garment--the eye panels do, in fact, allow your child to see out!"
    }),
    Product.create({
      name: 'Sibling Explorer Getup',
      imageUrl: 'images/kids4.jpg',
      inventory: 300,
      style: 'kids',
      price: 99.99,
      description:
        "Be honest--if you had more than one kid, you did it partly so you could dress them in matching clothes. We don't judge. Scratch that itch."
    }),
    Product.create({
      name: 'Plaid Mini Moonwalker Dress',
      imageUrl: 'images/kids5.jpg',
      inventory: 100,
      style: 'kids',
      price: 29.99,
      description:
        "Who says you can't explore in a dress? This one is made of an untearable fabric. Really. It cannot be torn, and we do not fully understand how that is, or whether it's safe."
    }),
    Product.create({
      name: 'Flower Girl Outfit',
      imageUrl: 'images/kids6.jpg',
      inventory: 100,
      style: 'kids',
      price: 89.99,
      description:
        "You got guilted into asking your sister's daughter to be the flower girl at your wedding, so you might as well give her something fabulous to wear."
    }),
    Product.create({
      name: 'Motherboard Dress',
      imageUrl: 'images/long_dress.jpg',
      inventory: 400,
      style: 'adults',
      price: 109.99,
      description:
        "Computers got us to the Moon, so it's high time we paid homage to them by wearing patterns inspired by their circuitry."
    }),
    Product.create({
      name: 'Nebula Dress',
      imageUrl: 'images/silver_dress.jpg',
      inventory: 1400,
      style: 'adults',
      price: 189.99,
      description:
        "This one's a showstopper, but we are legally required to warn all potential buyers that there are exactly zero armholes in this thing."
    }),
    Product.create({
      name: 'Geometric Sculpture Gown',
      imageUrl: 'images/shoulder_short_dress.jpg',
      inventory: 100,
      style: 'adults',
      price: 1999.99,
      description:
        'For the occasion when you want a silhouette that is less distinctly humanoid and more abstractly polygonal.'
    }),
    Product.create({
      name: 'Off-The-Shoulder Wrap',
      imageUrl: 'images/short_dress.jpg',
      inventory: 50,
      style: 'adults',
      price: 79.99,
      description:
        'Wear this one on eclipse day for a wicked asymmetrical tanline.'
    }),
    Product.create({
      name: 'Punk-Rock Neptune Streetwear',
      imageUrl: 'images/punk_dress.jpg',
      inventory: 200,
      style: 'adults',
      price: 39.99,
      description:
        "Because of Neptune's irradiated atmosphere, you've got to dress in layers. Might as well buy some that look awesome."
    }),
    Product.create({
      name: 'Group Halloween Costume',
      imageUrl: 'images/retro_party.jpg',
      inventory: 40,
      style: 'adults',
      price: 999.99,
      description:
        'CosmiQlo is the only clothing purveyor in the known universe to offer this authentic group costume, replicating the outfits of the first Intergalactically famous band: Whizzle & The Spacebombs.'
    }),
    Product.create({
      name: 'Space Joy',
      imageUrl: 'images/rainbow.jpg',
      inventory: 100,
      style: 'adults',
      price: 129.99,
      description:
        "We, the writers at CosmiQlo, don't feel the need to describe this garment, because if you have eyes, you want to buy it."
    }),
    Product.create({
      name: 'Milky Way Day Dress',
      imageUrl: 'images/skit_top.jpg',
      inventory: 250,
      style: 'adults',
      price: 79.99,
      description:
        'Painted like the galaxy, to remind you that you are the same as the stars you live among.'
    })
  ])

  const order1 = await Order.create({
    status: 'pending',
    date: new Date(),
    total: 100.0
  })

  // console.log(
  //   'printing Order magic methods:',
  //   Object.keys(Order.prototype)
  //   // Object.keys(Order.prototype),
  //   // Object.keys(orderProduct.prototype),
  //   // Object.keys(User.prototype)
  // )

  const someUser = await User.findByPk(1)

  await someUser.addOrder(order1)

  const product1 = await Product.findByPk(1)
  const product2 = await Product.findByPk(2)
  await order1.addProducts([product1, product2])

  // updating orderProduct table for this fake order
  const orderProductRow = await orderProduct.findOne({
    where: {
      productId: product1.id,
      orderId: order1.id
    }
  })

  orderProductRow.quantity = 1
  orderProductRow.price = product1.price
  await orderProductRow.save()

  const orderProductRow2 = await orderProduct.findOne({
    where: {
      productId: product2.id,
      orderId: order1.id
    }
  })

  orderProductRow2.quantity = 1
  orderProductRow2.price = product2.price
  await orderProductRow2.save()

  // console.log('order 1 with products added:', await order1.getProducts())

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
