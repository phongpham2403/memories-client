const { default: mongoose } = require('mongoose')
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

    async updatePost (req, res) {
        try {
            const { id }  = req.params
            const post = req.body
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id!')
            const updatedPost = await Post.findByIdAndUpdate({ _id: id },  post, {new: true})
            return res.status(200).json(updatedPost)
        } catch (error) {
            return res.status(409).json({message: error.message})
        }
    }

    async deletePost (req, res) {
        try {
            const { id }  = req.params
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id!')
            await Post.findOneAndDelete({ _id: id })
            return res.status(200).json({message: 'Post deleted successfully'})
        } catch (error) {
            return res.status(409).json({message: error.message})
        }
    }

    async likePost (req, res) { 
        try {
            const { id }  = req.params
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id!')
            const post = await Post.findById({ _id: id })
            const updatePost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
            return res.status(200).json(updatePost)

        } catch (error) {
            return res.status(409).json({message: error.message})
        }
    }
}

module.exports = new PostsController