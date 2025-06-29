# 🚀 StayInn Deployment Guide

## Deploy Both Frontend & Backend Together

### Option 1: Railway (Recommended)

#### Step 1: Prepare Your Repository
1. Make sure all files are committed to your GitHub repository
2. Ensure your `.env` files are properly configured

#### Step 2: Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your StayInn repository
5. Railway will automatically detect the configuration

#### Step 3: Configure Environment Variables
In Railway dashboard, add these environment variables:

**Database:**
```
MONGODB_URI=your_mongodb_connection_string
```

**Cloudinary:**
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**JWT:**
```
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
```

**Google OAuth:**
```
GOOGLE_CLIENT_ID=your_google_client_id
```

**Other:**
```
NODE_ENV=production
FRONTEND_URL=https://your-railway-app-url.railway.app
```

#### Step 4: Deploy
1. Railway will automatically build and deploy your application
2. The build process will:
   - Install dependencies for both frontend and backend
   - Build the React frontend
   - Start the Node.js server
   - Serve both from the same domain

#### Step 5: Access Your App
- Your app will be available at: `https://your-app-name.railway.app`
- Both frontend and backend run on the same domain
- API endpoints are available at: `https://your-app-name.railway.app/api`

---

### Option 2: Render (Alternative)

#### Step 1: Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account

#### Step 2: Deploy Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `stayinn-app`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

#### Step 3: Add Environment Variables
Same as Railway configuration above.

---

### Option 3: Heroku (Legacy but Reliable)

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
```

#### Step 2: Login and Create App
```bash
heroku login
heroku create stayinn-app
```

#### Step 3: Add Buildpacks
```bash
heroku buildpacks:set heroku/nodejs
```

#### Step 4: Configure Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# ... add all other environment variables
```

#### Step 5: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

## 🛠️ Pre-Deployment Checklist

### ✅ Code Ready
- [ ] All features working locally
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Images loading correctly

### ✅ Environment Variables
- [ ] MongoDB connection string
- [ ] Cloudinary credentials
- [ ] JWT secret
- [ ] Google OAuth credentials
- [ ] Production API URLs

### ✅ Database
- [ ] MongoDB Atlas cluster created
- [ ] Network access configured
- [ ] Database user created
- [ ] Connection string ready

### ✅ External Services
- [ ] Cloudinary account set up
- [ ] Google OAuth configured
- [ ] Domain names ready (optional)

---

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Verify build scripts are correct

2. **Environment Variables**
   - Double-check all variable names
   - Ensure no typos in values
   - Verify MongoDB connection string format

3. **CORS Issues**
   - Update CORS origin to your production domain
   - Check frontend API calls use correct URLs

4. **Database Connection**
   - Verify MongoDB Atlas network access
   - Check connection string format
   - Ensure database user has correct permissions

---

## 📊 Performance Optimization

### For Production:
1. **Enable Compression**
2. **Set up CDN for images**
3. **Configure caching headers**
4. **Monitor performance with tools like New Relic**

### Scaling:
1. **Upgrade to paid plans for better performance**
2. **Use database connection pooling**
3. **Implement rate limiting**
4. **Set up monitoring and alerts**

---

## 🎉 Success!

Once deployed, your StayInn application will be live at your chosen platform's URL. Share it with the world and start getting bookings!

**Created by Chirag Yadav** 🚀 