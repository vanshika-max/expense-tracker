const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true ,maxLength:150}
});

// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // try {
    //     this.password = await bcrypt.hash(this.password,10);
    //     console.log(this.password);
    //     next();
    // } catch (error) {
    //     console.error('Hashing error:', error);
    //     next(error);
    // }
});

// Method to generate authentication token
UserSchema.methods.generateAuthToken = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = mongoose.model('User', UserSchema);
