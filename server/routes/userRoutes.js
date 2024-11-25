const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        console.log('hashed password before storing into the database',hashedPassword);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();
        
        

        const token = user.generateAuthToken();
        res.status(201).json({ token });
    } catch (err) {
        console.error('Server error during registration:', err.message);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    console.log('login attempt recieved with data:',req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('user not found',email);      
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        console.log("user found result",user);
        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Comparison Result:', isMatch);

        if (!isMatch) {
            console.log('passwd mismatch for :',email);
            
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();
        res.json({ token });
    } catch (err) {
        console.error('Server error during login:', err.message);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
});

module.exports = router;
