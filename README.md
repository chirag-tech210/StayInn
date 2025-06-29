# 🏨 StayInn

![StayInn Home Screenshot](./screenshot-home.png)

> **StayInn** is a modern, full-stack travel accommodation platform for India, inspired by Airbnb, built with a futuristic blue theme and crafted by [Chirag Yadav](https://github.com/chirag-tech210).

---

## 🚀 Live Demo

🌐 [View StayInn Online](https://your-deployment-url.com)

---

## ✨ Features

- 🌏 **Location-based Listings:** Find unique stays across all Indian states and major cities
- 📸 **Location-specific Images:** Each place features beautiful, relevant Unsplash images
- 🔒 **Authentication:** Register, login, Google OAuth, JWT-based sessions
- 🏢 **Admin Panel:** Role-based access, blue-themed dashboard
- 🖼️ **Image Upload:** Cloudinary integration for fast, reliable image hosting
- 👤 **Modern Profile:** Editable user profiles with Unsplash avatars
- 🎨 **Futuristic UI:** Blue gradients, glassmorphism, smooth animations, and responsive design
- 📱 **Mobile Friendly:** Fully responsive for all devices

---

## 🖼️ Screenshots

### Home Page
![StayInn Home Screenshot](./screenshot-home.png)

### Admin Dashboard
<!-- Add your admin screenshot here if you want -->

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Radix UI, Lucide Icons
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary
- **Auth:** Google OAuth, JWT
- **Deployment:** Railway (or Vercel/Render/Heroku)
- **Other:** Unsplash for images, modern blue branding

---

## 🚦 Quick Start

### 1. Clone the Repo

```bash
git clone https://github.com/chirag-tech210/stayinn.git
cd stayinn
```

### 2. Install Dependencies

```bash
npm run install-all
```

### 3. Set Up Environment Variables

Create `.env` files in `/api` and `/client` as described in [DEPLOYMENT.md](./DEPLOYMENT.md).

### 4. Run Locally

```bash
npm run dev
```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend/API: [http://localhost:4000/api](http://localhost:4000/api)

---

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions (Railway, Render, Heroku).

---

## 🙋 FAQ

- **How do I add new places?**  
  Register/login, go to your account, and use the "Add new place" button.

- **How do I become admin?**  
  Set your user's `role` to `admin` in the database.

- **How do I change the branding?**  
  Edit the logo, colors, and text in `/client/src/components/ui/Header.jsx` and `/client/index.html`.

---

## 👨‍💻 Author

- **Chirag Yadav**  
  [GitHub](https://github.com/chirag-tech210) | [LinkedIn](https://www.linkedin.com/in/chirag-yadav/)

---

## 📸 How to Add Screenshots

1. Open your StayInn home page in your browser
2. Take a screenshot (e.g., `screenshot-home.png`)
3. Save it in the root of your repo
4. (Optional) Add more screenshots (e.g., `screenshot-admin.png`)

---

## ⭐️ Show Your Support

If you like this project, please ⭐️ the repo and share it!

---

> **StayInn** – The future of Indian travel, built with ❤️ by Chirag Yadav
