const router = require('express').Router()
const generalController = require('../controllers/general.controller')
const auth = require('../middleware/auth')


// User Routes
router.post('/registerUser', generalController.registerUser)
router.post('/registerAdmin', generalController.registerAdmin)
router.get('/me', auth('general'),  generalController.readUser)
router.patch('/meUpdate', auth('general'), generalController.updateUser)
router.delete('/meDelete', auth('general'), generalController.deleteUser)

// Products
router.post('/showSingleProduct', generalController.showSingleProduct)
router.get('/showProducts', generalController.showProducts)

//Authentication Routes
router.post('/login', generalController.loginUser)
router.post('/logout', auth('general'), generalController.logOut)
router.post('/logoutAll', auth('general'), generalController.logOutAll)

module.exports = router