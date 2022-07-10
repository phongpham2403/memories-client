const Post = require('../models/post')

class PostsController {
    async getPosts (req, res) {
        try {
            const postMessages = await Post.find({})
            return res.status(200).json(postMessages)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }
    async createPost (req, res) {
        const post = req.body
        const newPost = new Post(post)
        try {
            await newPost.save()
            return res.status(200).json(newPost)
        } catch (error) {
            return res.status(409).json({message: error.message})
        }
    }
}

module.exports = new PostsController