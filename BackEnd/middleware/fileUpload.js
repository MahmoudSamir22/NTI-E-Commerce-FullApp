const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let loc
        if(!req.user) loc = 'uploads/'
        else loc = path.join('uploads', (req.user._id).toString())

        fs.mkdir(loc, (err)=>{})
        cb(null, loc)
    },
    filename: function(req, file, cb){
        let name = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, name)
    }
})

const upload = multer({
    storage,
    limits:{fileSize: 2000000},
    fileFilter: function(req, file, callback){
        // ext = path.extname(file.originalname)
        // if(ext!="png") return callback(new Error('invalid extension'))
        callback(null, true)
    }
})

module.exports = upload