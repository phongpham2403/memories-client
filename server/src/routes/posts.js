const express = require("express");
const router = express.Router();

const postsController = require('../controllers/postsController')


router.get("/", postsController.getPosts);
router.post("/create", postsController.createPost);
router.patch("/:id/update", postsController.updatePost);
router.delete("/:id/delete", postsController.deletePost);
router.patch("/:id/like", postsController.likePost);

module.exports = router;