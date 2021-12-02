const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true
    },
    lname: {
        type: String,
        required: [true, "Last Name is Required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        lowercase: true,
        unique: [true, "This Email Already in use"],
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Please Enter a Valid Email')
        }
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        trim: true,
        validate(value){
            if(!validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1
            }))
                throw new Error ('Password must have atleast 1 LowerCase, 1 Uppercase, 1 Symbol and the minLenght is 8 charts')
        }
    },
    phone: {
        type: String,
        min: 11,
        max: 11,
        trim: true, 
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('Please Enter a valid mobile Number')
        }
    },
    age: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'SAdmin']
    },
    cart: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    wishlist: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    tokens: [
        {
            token: { type: String, required: true }
        }
    ]
},{
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this.toObject()
    let mydeleted
    if(user.role == 'User') mydeleted = ['password', '__v']
    else if(user.role == 'Admin') mydeleted = ['password', '__v', 'cart', 'wishlist']
    mydeleted.forEach(d => delete user[d])
    return user
}

userSchema.methods.addToCart = function(item, quantity, seller) {
    const user = this
    const exist = user.cart.find(i => i.item == item)
    if(exist) exist.quantity = exist.quantity + quantity
    else user.cart.push({item, quantity, seller})
    user.save()
}

userSchema.methods.removeCartItem =  function (item) {
    const user = this
    user.cart = user.cart.filter(i => i._id != item)
    user.save()
}

userSchema.methods.addToWishList = function(item, seller) {
    const user = this
    const exist = user.wishlist.find(i => i.item == item)
    if(exist) throw new Error('Item Already in your wish list')
    else user.wishlist.push({item, seller})
    user.save()
}

userSchema.methods.removeWishListItem =  function (item) {
    const user = this
    user.wishlist = user.wishlist.filter(i => i._id != item)
    user.save()
}

userSchema.methods.generateToken =  function () {
    const user = this
    const token = jwt.sign({_id: user._id}, 'NTI')
    user.tokens = user.tokens.concat({token})
    user.save()
    return token
}

userSchema.statics.logIn = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error ('There is no user with this email')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('Invalid Password')
    return user
}

userSchema.pre('save', async function () {
    const user = this
    if(user.isModified('password'))  user.password = await bcrypt.hash(user.password, 8)
})

userSchema.virtual('myProducts', {
    ref: "Product",
    localField: "_id",
    foreignField: "owner"
})

userSchema.virtual('cartDetails', {
    ref: "Product",
    localField: "cart.item",
    foreignField: "_id"
})

userSchema.virtual('myOrders', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'buyer'
})

userSchema.virtual('userOrder', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'orderContent.seller'
})

const User = mongoose.model('User', userSchema)

module.exports = User