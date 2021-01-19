/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as singleProduct} from './singleProduct'
export {default as Products} from './products'
export {default as Cart} from './cart'
export {default as CartPage} from './cartPage'
export {default as UpdateProduct} from './updateProduct'
export {Login, Signup} from './auth-form'
export {default as GuestCart} from './guestCart'
