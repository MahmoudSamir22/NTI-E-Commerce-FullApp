const mongoose = require("mongoose")

const feedBackSchema = mongoose.Schema({
    description:{
        type: String,
        trim: true,
        required: true

    } 
})

const Feedback = new mongoose.model('Feedback', feedBackSchema)
module.exports = Feedback