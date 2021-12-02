require('dotenv').config()
require('../db/dbConnection')
const express = require('express')
const generalRouter = require('../routes/general.routes')
const userRouter = require('../routes/user.routes')
const adminRouter = require('../routes/admin.routes')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())
app.use('/general', generalRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)

module.exports = app