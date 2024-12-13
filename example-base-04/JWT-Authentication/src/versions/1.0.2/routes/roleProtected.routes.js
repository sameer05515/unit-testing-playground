const express = require('express');
const router = express.Router();

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

// Sample secured route (only accessible by users with 'admin' role)
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.json({
        status: 'success',
        messages: ['Admin content accessed'],
        data: { user: req.user },
        statusCode: 200,
        timeStamp: new Date().toISOString(),
    });
});

// Another route (only accessible by 'user' and 'admin' roles)
router.get('/user', authenticateToken, authorizeRoles('user', 'admin'), (req, res) => {
    res.json({
        status: 'success',
        messages: ['User content accessed'],
        data: { user: req.user },
        statusCode: 200,
        timeStamp: new Date().toISOString(),
    });
});

// Public route (no role required)
router.get('/public', (req, res) => {
    res.json({
        status: 'success',
        messages: ['Public content accessed'],
        data: null,
        statusCode: 200,
        timeStamp: new Date().toISOString(),
    });
});

// Start server
// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });

module.exports = router;
