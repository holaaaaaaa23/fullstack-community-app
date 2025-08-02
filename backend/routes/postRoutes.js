// backend/routes/postRoutes.js
const express = require('express');
const {
    createPost,
    getPosts,
    getPostsByUserId,
} = require('../controllers/postController.js');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

// Route for creating a post and getting all posts
router.route('/').post(protect, createPost).get(getPosts);

// Route to get posts for a specific user
router.get('/user/:userId', getPostsByUserId);

module.exports = router;