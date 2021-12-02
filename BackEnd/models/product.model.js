const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required: true,
        maxlenght: 40,
        trim: true
    },
    description:{
        type: String,
        trim: true,
        required: true

    },
    quantity:{
        type: Number,
        required: true
    },
    image:{
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const prodacts = new mongoose.model('Product', productSchema)

module.exports = prodacts