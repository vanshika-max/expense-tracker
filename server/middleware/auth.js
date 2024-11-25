const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Find the user by ID
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach user to the request object
        req.user = user;
        next();
    } catch (err) {
        console.error('Authentication error:', err.message);
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = auth;
