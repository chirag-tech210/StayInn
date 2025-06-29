const { connectWithDB } = require('../config/db');
const User = require('../models/User');

const updateAvatars = async () => {
  try {
    await connectWithDB();
    console.log('Connected to database');

    // Update users who have the old default avatar
    const oldDefaultAvatar = 'https://res.cloudinary.com/rahul4019/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695133265/pngwing.com_zi4cre.png';
    const newDefaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';

    const result = await User.updateMany(
      { picture: oldDefaultAvatar },
      { picture: newDefaultAvatar }
    );

    console.log(`Updated ${result.modifiedCount} users with new default avatar`);
    console.log('✅ All avatars updated successfully!');

    // Show some statistics
    const totalUsers = await User.countDocuments();
    console.log(`Total users in database: ${totalUsers}`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating avatars:', error);
    process.exit(1);
  }
};

updateAvatars(); 