// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // It's good practice to add this
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS - allows frontend to communicate
app.use(cors());

// Middleware to parse JSON bodies - THIS IS THE CRITICAL LINE
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));