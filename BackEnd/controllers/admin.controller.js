// const adminModel = require('../models/admin.model')
const productModel = require('../models/product.model')
const feedbackModel = require('../models/feedback.model')
const reportModel = require('../models/report.model')

class Admin{

    static addProduct = async (req, res)=> {
        try {
            const product = await new productModel({
                ...req.body,
                owner: req.user._id
            })
            await product.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Added',
                data: product
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: " Error in adding Admin Data"
            })
        }
    }

    static showProduct = async (req, res)=> {
        try {
            await req.user.populate({
                path: 'myProducts'
            })
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Added',
                data: req.user.myProducts
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: " Error in adding Admin Data"
            })
        }
    }

    static showOrder = async (req, res) => {
        try {
            await req.user.populate({
                path: 'userOrder'
            })
            res.status(200).send({
                apiStatus: true,
                message: 'Successfuly Fetched',
                data: req.user.userOrder
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
            })
        }
    }

    static updateProduct = async (req, res) => {
        try {
            console.log(req.body);
            const product = await productModel.findOneAndUpdate({_id: req.body.id, owner: req.user._id}, req.body)
            console.log(product);
            if(!product) throw new Error('Product not found')
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Updated',
                data: product
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
                message: " Error in Update Prodact Data"
            })
        }
    }

    static deleteProduct = async (req, res) => {
        try {
            const product = await productModel.findOneAndDelete({_id: req.body.id, owner: req.user._id} , req.body)
            if(!product) throw new Error('Product not found')
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Deleted',
                data: product
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message,
                message: " Error in Deleted Prodact Data"
            })
        }
    }

}


module.exports = Admin