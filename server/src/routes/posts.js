const express = require("express");
const router = express.Router();

const postsController = require('../controllers/postsController');
const auth = require("../middlewares/auth");


router.get("/", postsController.getPosts);
router.get("/search", postsController.getPostsBySearch);
router.post("/create", auth, postsController.createPost);
router.get("/:id", auth, postsController.getPost);
router.patch("/:id/update", auth, postsController.updatePost);
router.delete("/:id/delete", auth, postsController.deletePost);
router.patch("/:id/like", auth, postsController.likePost);

module.exports = router;