const express = require('express');
const User = require('../model/User');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch(err) {
        res.status(500).json({error: 'Failed to fetch profile'});
    }
});

module.exports = router;