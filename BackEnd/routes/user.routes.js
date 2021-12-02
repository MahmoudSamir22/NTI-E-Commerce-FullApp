const router = require('express').Router()
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

// Cart Routes
router.post('/addToCart', auth('User'), userController.addToCart)
router.get('/showCart', auth('User'), userController.showCart)
router.delete('/removeFromCart', auth('User'), userController.removeCartItem)
router.delete('/clearCart', auth('User'), userController.clearCart)

// Order Routes
router.post('/placeOrder', auth('User'), userController.placeOrder)
router.get('/readOrder', auth('User'), userController.readOrder)
router.delete('/deleteOrder', auth('User'), userController.deleteOrder)

// WishList Routes
router.post('/addToWishList', auth('User'), userController.addToWishList)
router.get('/showWishList', auth('User'), userController.showWishList)
router.delete('/removeFromWishList', auth('User'), userController.removeWishListItem)
router.delete('/clearWishList', auth('User'), userController.clearWishList)


module.exports = router

