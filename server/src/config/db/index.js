const mongoose = require('mongoose')
require('dotenv').config()


async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.0lubk.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Connect database success!')
    } catch (error) {
        console.log('Connect database failure!')
    }
}

module.exports =  { connect }