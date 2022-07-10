const postsRouter = require('../routes/posts') 

const route = (app) => {
    app.use('/api/v1/posts', postsRouter)
}

module.exports = route