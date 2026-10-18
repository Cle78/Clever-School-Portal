const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register (Admin / Super Admin use)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, profileDetails } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword, role, profileDetails });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', userId: savedUser._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login (Unified SSO Route)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });

        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email }, 
            process.env.JWT_SECRET || 'secretkey', 
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
