const mongoose = require('mongoose')
try {
    mongoose.connect(`${process.env.DBURL}${process.env.DBNAME}`)
    console.log('Connected to DataBase');
} catch (e) {
    console.log(e.message);
}


