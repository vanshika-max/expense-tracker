

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

// delete expenses
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOneAndDelete({ _id: id, user: req.user._id });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found or not authorized' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
