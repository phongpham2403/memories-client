const path = require('path')
const express = require('express')
const cors = require('cors')
require('dotenv').config()


const app = express()


const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect();


app.use(cors())
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({
    limit: '30mb',
    extended: true
}))

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})
// app.use('/public', express.static(path.join(__dirname), 'uploads'))

// init routes
route(app)

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is working at http://localhost:${process.env.PORT}`);
})