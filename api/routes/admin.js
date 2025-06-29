const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/admin');
const {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    getAdminInfo
} = require('../controllers/adminController');

// All routes require admin authentication
router.use(isAdmin);

// Dashboard statistics
router.get('/dashboard', getDashboardStats);

// Admin info
router.get('/info', getAdminInfo);

// User management
router.get('/users', getAllUsers);
router.put('/users/:userId/role', updateUserRole);

module.exports = router; 