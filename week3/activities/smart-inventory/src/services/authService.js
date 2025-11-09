const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN =process.env.JWT_EXPIRES_IN ;

async function register(data) {
    const { name, email, password, role } = data;

    const existing = await User.findOne({ email });
    if (existing) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ name, email, password: hashedPassword, role });
    return user;
}

async function login(data) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user, token };
}

module.exports = {
    register,
    login
};
