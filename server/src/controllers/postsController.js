const { default: mongoose } = require('mongoose')
const Post = require('../models/post')

class PostsController {
    async getPosts(req, res) {
        const { page } = req.query
        try {
            const LIMIT = 8
            const startIndex = (Number(page) - 1) * LIMIT

            const total = await Post.countDocuments({})
            const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
            return res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) })
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }

    async getPost(req, res) {
        const { id } = req.params
        try {
            const post = await Post.findById(id);
            return res.status(200).json(post);
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }

    async createPost(req, res) {
        const post = req.body
        const newPost = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
        try {
            await newPost.save()
            return res.status(200).json(newPost)
        } catch (error) {
            return res.status(409).json({ message: error.message })
        }
    }

    async updatePost(req, res) {
        try {
            const { id } = req.params
            const post = req.body
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id!')
            const updatedPost = await Post.findByIdAndUpdate({ _id: id }, post, { new: true })
            return res.status(200).json(updatedPost)
        } catch (error) {
            return res.status(409).json({ message: error.message })
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.params
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id!')
            await Post.findOneAndDelete({ _id: id })
            return res.status(200).json({ message: 'Post deleted successfully' })
        } catch (error) {
            return res.status(409).json({ message: error.message })
        }
    }

    async likePost(req, res) {
        try {
            const { id } = req.params
            if (!req.userId) return res.status(404).json({ message: 'Unauthenticated' })

            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id!')
            const post = await Post.findById({ _id: id })

            const index = post.likes.findIndex((id) => id === String(req.userId))
            if (index === -1) {
                post.likes.push(req.userId)
            } else {
                post.likes = post.likes.filter((id) => id !== String(req.userId))
            }

            const updatePost = await Post.findByIdAndUpdate(id, post, { new: true })
            return res.status(200).json(updatePost)

        } catch (error) {
            return res.status(409).json({ message: error.message })
        }
    }

    async getPostsBySearch(req, res) {
        const { searchQuery, tags } = req.query
        try {
            const title = new RegExp(searchQuery, "i");
            const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }
}

module.exports = new PostsController