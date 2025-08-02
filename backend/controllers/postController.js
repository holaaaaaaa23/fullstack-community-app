// backend/controllers/postController.js
const Post = require('../models/postModel.js');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        res.status(400).json({ message: 'Content is required' });
        return;
    }

    const post = new Post({
        content,
        user: req.user._id, // req.user is from our 'protect' middleware
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
    // Find all posts, sort by newest, and populate user's name
    const posts = await Post.find({})
        .populate('user', 'name')
        .sort({ createdAt: -1 });
    res.json(posts);
};

// @desc    Get posts by user ID
// @route   GET /api/posts/user/:userId
// @access  Public
const getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(404).json({ message: 'Posts not found' });
    }
};

module.exports = { createPost, getPosts, getPostsByUserId };