const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Check if user is admin
exports.isAdmin = async (req, res, next) => {
    try {
        // Get token from cookies or headers
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token or access denied.',
        });
    }
}; 