const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const makeUserAdmin = async (email) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');

        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log('User not found with email:', email);
            return;
        }

        // Update user role to admin
        user.role = 'admin';
        await user.save();

        console.log(`User ${user.name} (${email}) is now an admin!`);
        console.log('User details:', {
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Get email from command line argument
const email = process.argv[2];

if (!email) {
    console.log('Usage: node makeAdmin.js <email>');
    console.log('Example: node makeAdmin.js user@example.com');
    process.exit(1);
}

makeUserAdmin(email); 