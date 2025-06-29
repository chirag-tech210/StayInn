const User = require('../models/User');
const Place = require('../models/Place');
const Booking = require('../models/Booking');

// Super admin email - only this user can manage admins
const SUPER_ADMIN_EMAIL = 'achirag1008@gmail.com';

// Get admin dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPlaces = await Place.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const inactiveUsers = await User.countDocuments({ isActive: false });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalPlaces,
                totalBookings,
                activeUsers,
                inactiveUsers
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics'
        });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

// Update user role - Only super admin can do this
exports.updateUserRole = async (req, res) => {
    try {
        // Check if current user is super admin
        if (req.user.email !== SUPER_ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: 'Only super admin can manage user roles'
            });
        }

        const { userId } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role'
            });
        }

        // Prevent changing super admin role
        const targetUser = await User.findById(userId);
        if (targetUser && targetUser.email === SUPER_ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: 'Cannot modify super admin role'
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user role'
        });
    }
};

// Get admin info
exports.getAdminInfo = async (req, res) => {
    try {
        const isSuperAdmin = req.user.email === SUPER_ADMIN_EMAIL;
        
        res.status(200).json({
            success: true,
            data: {
                isSuperAdmin,
                email: req.user.email,
                name: req.user.name,
                role: req.user.role
            }
        });
    } catch (error) {
        console.error('Get admin info error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching admin info'
        });
    }
};

// Toggle user active status
exports.toggleUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            data: {
                userId: user._id,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.error('Toggle user status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error toggling user status'
        });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Also delete user's places and bookings
        await Place.deleteMany({ owner: userId });
        await Booking.deleteMany({ user: userId });

        res.status(200).json({
            success: true,
            message: 'User and associated data deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user'
        });
    }
};

// Get all places with pagination
exports.getAllPlaces = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const places = await Place.find({})
            .populate('owner', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPlaces = await Place.countDocuments();
        const totalPages = Math.ceil(totalPlaces / limit);

        res.status(200).json({
            success: true,
            data: {
                places,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalPlaces,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        });
    } catch (error) {
        console.error('Get all places error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching places'
        });
    }
};

// Delete place
exports.deletePlace = async (req, res) => {
    try {
        const { placeId } = req.params;

        const place = await Place.findByIdAndDelete(placeId);
        if (!place) {
            return res.status(404).json({
                success: false,
                message: 'Place not found'
            });
        }

        // Also delete associated bookings
        await Booking.deleteMany({ place: placeId });

        res.status(200).json({
            success: true,
            message: 'Place and associated bookings deleted successfully'
        });
    } catch (error) {
        console.error('Delete place error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting place'
        });
    }
};

// Get all bookings with pagination
exports.getAllBookings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const bookings = await Booking.find({})
            .populate('user', 'name email')
            .populate('place', 'title address')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalBookings = await Booking.countDocuments();
        const totalPages = Math.ceil(totalBookings / limit);

        res.status(200).json({
            success: true,
            data: {
                bookings,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalBookings,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        });
    } catch (error) {
        console.error('Get all bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings'
        });
    }
}; 