const userModel = require('../models/user.model')
const productModel = require('../models/product.model')

class General  {

    static registerUser = async (req, res) => {
        try {
            if(req.body.body) req.body = req.body.body
            const user = await new userModel(req.body)
            user.role="User"
            await user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Created',
                data: user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static registerAdmin = async (req, res) => {
        try {
            // if(!req.body.role || req.body.role =="User") throw new Error("Please choose an admin type")
            const user = await new userModel(req.body)
            user.role="Admin"
            await user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Created',
                data: user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static readUser = async (req, res) => {
        try {
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Found',
                data: req.user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }

    }

    static updateUser = async (req, res) => {
        try {
            let user = req.user
            for(let p in req.body){
                user[p] = req.body[p]
            }
            await user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Updated',
                data: req.user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static deleteUser = async (req, res) => {
        try {
            await userModel.findByIdAndDelete(req.user._id)
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Deleted',
                data: req.user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static showSingleProduct = async (req, res) => {
        try {
            const product = await productModel.findById(req.body.id)
            if(!product) throw new Error('Product not Found')
            res.status(200).send({
                apiStatus: true,
                message: 'Successfuly Fetched',
                data: product
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static showProducts = async (req, res) => {
        try {
            const products = await productModel.find()
            res.status(200).send({
                apiStatus: true,
                message: 'Successfuly Fetched',
                data: products
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    //Authentication and LogIn
    static loginUser = async (req, res) => {
        try {
            const user = await userModel.logIn(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Logged In',
                token,
                data: user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static logOut = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Logged Out',
                data: req.user
            })
        } catch (e) {
            res.status(503).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static logOutAll = async (req, res) => {
        try{
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Logged Out',
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

module.exports = General