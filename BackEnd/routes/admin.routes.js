const router = require('express').Router()
const adminController = require('../controllers/admin.controller')
const auth = require('../middleware/auth')

router.post('/addProduct', auth('Admin'), adminController.addProduct)

router.get('/showMyProducts', auth('Admin'),  adminController.showProduct)

router.get('/showOrders', auth('Admin'), adminController.showOrder)

router.patch('/updateProduct/', auth('Admin'), adminController.updateProduct)

router.delete('/deleteProduct/', auth('Admin'), adminController.deleteProduct)


module.exports = router