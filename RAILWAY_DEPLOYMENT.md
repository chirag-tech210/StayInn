# Railway Deployment Guide for StayInn

## Prerequisites
- GitHub repository with your code (✅ Already done)
- Railway account (free tier available)
- MongoDB Atlas database
- Cloudinary account (for image uploads)
- Google OAuth credentials

## Step 1: Set up Railway Account

1. Go to [Railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `chirag-tech210/StayInn` repository

## Step 2: Configure Environment Variables

In your Railway project dashboard, go to the "Variables" tab and add these environment variables:

### Database Configuration
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stayinn?retryWrites=true&w=majority
```

### JWT & Session Configuration
```
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
COOKIE_TIME=7
SESSION_SECRET=your_session_secret_key_here
```

### Cloudinary Configuration
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Google OAuth Configuration
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Frontend Configuration
```
FRONTEND_URL=https://your-app-name.railway.app
NODE_ENV=production
PORT=4000
```

## Step 3: Deploy

1. Railway will automatically detect the `package.json` and start building
2. The build process will:
   - Install dependencies for root, client, and api
   - Build the React frontend
   - Start the Node.js backend
3. Your app will be available at `https://your-app-name.railway.app`

## Step 4: Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to your OAuth 2.0 credentials
3. Add your Railway domain to authorized redirect URIs:
   - `https://your-app-name.railway.app/auth/google/callback`

## Step 5: Test Your Deployment

1. Visit your Railway URL
2. Test user registration/login
3. Test Google OAuth login
4. Test place booking functionality
5. Test admin panel (if you have admin users)

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check Railway logs for missing dependencies
2. **Database Connection**: Verify MongoDB URI is correct
3. **CORS Issues**: Ensure FRONTEND_URL matches your Railway domain
4. **OAuth Issues**: Update Google OAuth redirect URIs

### Check Logs:
- Go to Railway dashboard → Your project → "Deployments" tab
- Click on the latest deployment to view logs

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| MONGODB_URI | MongoDB connection string | ✅ |
| JWT_SECRET | Secret key for JWT tokens | ✅ |
| JWT_EXPIRE | JWT token expiration time | ✅ |
| COOKIE_TIME | Cookie expiration in days | ✅ |
| SESSION_SECRET | Secret for session cookies | ✅ |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | ✅ |
| CLOUDINARY_API_KEY | Cloudinary API key | ✅ |
| CLOUDINARY_API_SECRET | Cloudinary API secret | ✅ |
| GOOGLE_CLIENT_ID | Google OAuth client ID | ✅ |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | ✅ |
| FRONTEND_URL | Your Railway app URL | ✅ |
| NODE_ENV | Set to 'production' | ✅ |
| PORT | Port number (Railway sets this) | ❌ |

## Cost Optimization

- Railway free tier includes 500 hours/month
- MongoDB Atlas has a free tier (512MB)
- Cloudinary has a free tier (25GB storage, 25GB bandwidth)

## Support

If you encounter issues:
1. Check Railway logs
2. Verify all environment variables are set
3. Ensure your GitHub repository is up to date
4. Contact Railway support if needed

---

**Happy Deploying! 🚀** 