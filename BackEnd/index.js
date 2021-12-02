const app = require('./src/app')



app.listen(process.env.PORT, () => {
    console.log(`Connected on port: ${process.env.PORT}`);
})