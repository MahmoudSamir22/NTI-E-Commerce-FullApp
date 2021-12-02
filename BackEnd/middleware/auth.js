const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const auth = (type) => {
    return async (req, res, next) => {
        try {
                const token = req.header('Authorization').replace('Bearer ', '')
                const decodedToken = jwt.verify(token, 'NTI')
                const user = await userModel.findOne({_id: decodedToken._id,'tokens.token': token})
                if(!user) throw new Error()
                if(user.role!=type && type !='general') throw new Error(`You Are Not ${type}`)
                req.token = token
                req.user = user
                next()
        } catch (e) {
            res.status(401).send({apiStatus: false, message: 'Unauthorized', data: e.message})
        }
    }
}

module.exports = auth