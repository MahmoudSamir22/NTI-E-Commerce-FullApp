const userModel = require('../models/user.model')
const Order = require('../models/order.model')
const productModel = require('../models/product.model')

class User {

    // Cart Functions
    
    static addToCart = async (req, res) => {
        try {
            if(req.body.body) req.body = req.body.body
            await req.user.addToCart(req.body.item, req.body.quantity, req.body.seller)
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Added to the cart',
                data: req.user.cart
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static showCart = async (req, res) => {
        try {
            let cart = req.user.cart
            let newCart = []
            for (let item of cart){
                let product = await productModel.findById(item.item)
                newCart.push({item: product, quantity: item.quantity, seller: item.seller, itemCartId: item._id})
            }
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Featched the cart',
                data: newCart
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static removeCartItem = async (req, res) => {
        try {
            await req.user.removeCartItem(req.body.item)
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Deleted Item from cart',
                data: req.user.cart
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static clearCart = async (req, res) => {
        try {
            req.user.cart = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Cleared the Cart',
                data: req.user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    // Order Functions
    
    static placeOrder = async (req, res) => {
        try {
            if(req.user.cart.length == 0) throw new Error('There is no Items in the cart')
            const order = await new Order({
                buyer: req.user._id,
                orderContent: req.user.cart
            })
            await order.save()
            req.user.cart = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Successfuly Orderd',
                data: order
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static readOrder = async (req, res) => {
        try {
            // const orders = await Order.find({buyer: req.user._id})
            let orders = []
            await req.user.populate({
                path: 'myOrders'
            })
            for(let o of req.user.myOrders ){
                await o.populate({
                    path:'prodDetails'
                })
                orders.push({order:o, details:o.prodDetails})
            }
            res.status(200).send({
                apiStatus: true,
                message: 'Successfuly Orderd',
                data: orders 
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static deleteOrder = async (req, res) => {
        try {
            const order = await Order.findByIdAndDelete(req.body.id)
            res.status(200).send({
                apiStatus: true,
                message: 'Deleted the order Succesfully',
                data: order
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    // WishList Functions

    static addToWishList = async (req, res) => {
        try {
            if(req.body.body) req.body = req.body.body
            await req.user.addToWishList(req.body.item, req.body.seller)
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Added to the WishList',
                data: req.user.wishlist
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static showWishList = async (req, res) => {
        try {
            let wishlist = req.user.wishlist
            let newWishlist = []
            for (let item of wishlist){
                let product = await productModel.findById(item.item)
                newWishlist.push({item: product, seller: item.seller, itemWishlistId: item._id})
            }
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Featched the cart',
                data: newWishlist
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static removeWishListItem = async (req, res) => {
        try {
            await req.user.removeWishListItem(req.body.item)
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Deleted Item from WishList',
                data: req.user.wishlist
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static clearWishList = async (req, res) => {
        try {
            req.user.wishlist = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Cleared the WishList',
                data: req.user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    } 
}

module.exports = User