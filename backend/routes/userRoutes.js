// backend/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController.js'); // Updated import
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); // Added login route

module.exports = router;