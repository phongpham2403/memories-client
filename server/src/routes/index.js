const postsRouter = require('../routes/posts') 
const userRouter = require('../routes/user') 

const route = (app) => {
    app.use('/api/v1/posts', postsRouter)
    app.use('/api/v1/user', userRouter)
}

module.exports = route