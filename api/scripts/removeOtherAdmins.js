const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const SUPER_ADMIN_EMAIL = 'achirag1008@gmail.com';

const removeOtherAdmins = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');

        // Find all admin users except super admin
        const adminUsers = await User.find({ 
            role: 'admin',
            email: { $ne: SUPER_ADMIN_EMAIL }
        });

        if (adminUsers.length === 0) {
            console.log('No other admin users found. You are the only admin.');
            return;
        }

        console.log(`Found ${adminUsers.length} other admin users:`);
        adminUsers.forEach(user => {
            console.log(`- ${user.name} (${user.email})`);
        });

        // Remove admin role from all other users
        const result = await User.updateMany(
            { 
                role: 'admin',
                email: { $ne: SUPER_ADMIN_EMAIL }
            },
            { role: 'user' }
        );

        console.log(`\n✅ Successfully removed admin role from ${result.modifiedCount} users.`);
        console.log(`\nYou (${SUPER_ADMIN_EMAIL}) are now the only admin!`);

        // Verify super admin status
        const superAdmin = await User.findOne({ email: SUPER_ADMIN_EMAIL });
        if (superAdmin) {
            console.log('\nSuper Admin Details:');
            console.log(`- Name: ${superAdmin.name}`);
            console.log(`- Email: ${superAdmin.email}`);
            console.log(`- Role: ${superAdmin.role}`);
            console.log(`- Active: ${superAdmin.isActive}`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
};

console.log('🔐 Removing admin access from all users except you...\n');
removeOtherAdmins(); 