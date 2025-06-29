# 🚀 Railway Deployment Checklist

## ✅ Pre-Deployment (Completed)
- [x] Code pushed to GitHub
- [x] Railway configuration files created
- [x] Backend configured to serve static files
- [x] Frontend axios configured for production
- [x] Build process tested locally
- [x] node-fetch dependency installed

## 🔧 Railway Setup (To Do)

### 1. Create Railway Account
- [ ] Go to [Railway.app](https://railway.app)
- [ ] Sign up with GitHub account
- [ ] Create new project from GitHub repo

### 2. Configure Environment Variables
Add these in Railway dashboard → Variables tab:

#### Database
- [ ] `MONGODB_URI` - Your MongoDB Atlas connection string

#### Authentication
- [ ] `JWT_SECRET` - Random secret key for JWT tokens
- [ ] `JWT_EXPIRE` - Set to `7d`
- [ ] `COOKIE_TIME` - Set to `7`
- [ ] `SESSION_SECRET` - Random secret for sessions

#### Cloudinary (Image Uploads)
- [ ] `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Your Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

#### Google OAuth
- [ ] `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- [ ] `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret

#### App Configuration
- [ ] `FRONTEND_URL` - Your Railway app URL (e.g., `https://stayinn-production.railway.app`)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Railway will set this automatically

### 3. Update Google OAuth Settings
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Navigate to OAuth 2.0 credentials
- [ ] Add Railway domain to authorized redirect URIs:
  - `https://your-app-name.railway.app/auth/google/callback`

### 4. Deploy
- [ ] Railway will automatically build and deploy
- [ ] Monitor build logs for any errors
- [ ] Wait for deployment to complete

### 5. Test Deployment
- [ ] Visit your Railway URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test Google OAuth login
- [ ] Test place browsing
- [ ] Test booking functionality
- [ ] Test admin panel (if applicable)

## 🔍 Troubleshooting

### If Build Fails:
1. Check Railway logs
2. Verify all dependencies are in package.json
3. Ensure environment variables are set correctly

### If App Doesn't Load:
1. Check if backend is running
2. Verify MongoDB connection
3. Check CORS settings

### If OAuth Doesn't Work:
1. Verify Google OAuth redirect URIs
2. Check environment variables
3. Ensure HTTPS is enabled

## 📞 Support Resources

- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com)
- [Cloudinary Setup](https://cloudinary.com/documentation)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ App loads without errors
- ✅ Users can register and login
- ✅ Google OAuth works
- ✅ Places can be browsed and booked
- ✅ Images upload correctly
- ✅ Admin panel is accessible (if applicable)

---

**Ready to deploy? Let's go! 🚀** 