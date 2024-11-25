

const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();
const auth = require('../middleware/auth');

// Add Expense
router.post('/', auth, async (req, res) => {
    const { amount, category, description } = req.body;
    try {
        const expense = new Expense({ user: req.user._id, amount, category, description });
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Expenses
router.get('/', auth, async (req, res) => {
    const { category } = req.query; // Get category from query params

    try {
        // Define the query object
        const query = { user: req.user._id };
        if (category) {
            query.category = category; // Filter by category if provided
        }

        const expenses = await Expense.find(query); // Fetch expenses based on query
        res.json(expenses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
