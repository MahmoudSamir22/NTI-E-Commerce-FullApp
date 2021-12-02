const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderContent: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type: Number,
                default: 1
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
})

orderSchema.virtual('prodDetails', {
    ref: 'Product',
    localField: "orderContent.item",
    foreignField: "_id"
})

const Order = mongoose.model('Orders', orderSchema)

module.exports = Order