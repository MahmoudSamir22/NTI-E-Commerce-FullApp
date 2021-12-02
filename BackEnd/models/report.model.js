const mongoose = require("mongoose")

const reportSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        maxlenght: 40,
        trim: true
    },
    description:{
        type: String,
        trim: true,
        required: true

    },
    Date:{
        type: String,
        validate(value){
            if(value<(Date.now()+1)) throw new Error("Date Error")
        }
    },
    status:{
        type: String,
        enum: ['solved', 'starting', 'running', 'not started', 'not solved'],
        required: true
    }
})

const Report = new mongoose.model('Report', reportSchema)

module.exports = Report