require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.URL_MONGO, {
            useNewUrlParser: true,
        })
        console.log('Connect to MongoDB')
    }
    catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB