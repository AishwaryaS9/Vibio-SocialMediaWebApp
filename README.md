# Vibio - MERN Stack Social Media App

## 🚀 Project Overview

**Vibio** is a modern full-stack social media application built with the **MERN** stack (MongoDB, Express, React, Node.js). It delivers a complete social platform experience with authentication, media handling, background jobs, and real-time communication.

---

## 🌐 Live URL & Repository

- **Live Application**: [https://vibio-social-media-web-app.vercel.app/](https://vibio-social-media-web-app.vercel.app/)

- **GitHub Repository**: [https://github.com/AishwaryaS9/Vibio-SocialMediaWebApp.git](https://github.com/AishwaryaS9/Vibio-SocialMediaWebApp.git)

---

## ✨ Features

### 🔑 Authentication

- **🔐 Secure sign-in / sign-up powered by Clerk**: A responsive and accessible login page powered by Clerk authentication, featuring branded visuals, background imagery, and a seamless sign-in experience for users.

- **👤 Profile management & personalization**: Users can manage their details such as name, username, bio, and location, customize profile visuals with profile and cover photos, and explore their posts, media, likes, followers, and following for a richer, more personalized experience.

### ⚡ Core Social Features

- **💬 Real-time chat and messaging**: Users can manage conversations, search contacts, and exchange text or image messages in real time with read receipts and smooth updates, making communication seamless and engaging.

- **📝 Post & feed system**: Users can manage posts by sharing text, images, or both, with support for hashtags, likes, comments, and shares, while the feed displays personalized content, stories, and recent messages to keep the experience engaging and interactive.

- **👥 Connections & Network Management**: Users can manage their social network by following or unfollowing others, handling incoming connection requests, accepting pending invites, and keeping track of followers, following, and active connections for seamless interaction.

- **📖 Stories / status uploads**: Users can create and share stories in the form of text, images, or short videos with customizable backgrounds, while also being able to view others’ stories in a fullscreen viewer with progress tracking for seamless and engaging interactions.

- **🔍 User search & discovery**: Users can easily search and discover new people by name, username, bio, or location, with instant results and suggestions to help expand their network and connect with like-minded individuals.

### 📦 Infrastructure

- **Inngest** for background jobs & scheduled tasks

- **ImageKit** for media storage, optimization & fast delivery

### 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, Vite

- **State Management**: Redux Toolkit

- **Styling**: Tailwind CSS

- **Icons**: lucide-react

- **API Integration:** Axios for seamless backend communication

- **Backend**: Node.js, Express.js

- **Database**: MongoDB

- **Authentication**: Clerk

- **Email Service**: NodeMailer to send connection request reminder

- **Background Jobs**: Inngest

- **Media Handling**: ImageKit

- **File Uploads**: Multer for handling file uploads

### 📌 Deployment

Deployable as a full-stack MERN application with real-time features, optimized media delivery, and scalable background job handling.

- Frontend: Hosted on [Vercel](https://vercel.com/) for fast, reliable, and scalable deployment.

- Backend: Hosted on [Vercel](https://vercel.com/) to provide robust and scalable server-side support.

---

## 📂 Project Structure

```
├── client/
│   ├── dist/
│   │   ├── assets/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── connections/
│   │   │   ├── messages/
│   │   │   ├── user/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   ├── vercel.json
│   ├── vite.config.ts
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── inngest/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── vercel.json
├── README.md
```

## 🚀 Getting Started

### Setup:

1.  Clone the repository:

    ```bash
    git clone https://github.com/AishwaryaS9/Vibio-SocialMediaWebApp.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd Vibio-SocialMediaWebApp-main
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Set up environment variables:

- Create a .env file in the server directory and add the following:

        cd server

  ```bash
  MONGODB_URI=your_mongodb_uri

  PORT=your_port_no

  JWT_SECRET=your_jwt_secret

  FRONTEND_URL=your_frontend_url

  INNGEST_EVENT_KEY=your_inngest_event_key

  INNGEST_SIGNING_KEY=your_inngest_signing_key

  CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

  CLERK_SECRET_KEY=your_clerk_secret_key

  CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

  IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key

  IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

  IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

  SENDER_EMAIL=your_sender_email_id

  SMTP_USER=your_smtp_username

  SMTP_PASS=your_smtp_password
  ```

- Create a .env file in the client directory and add the following:

        cd client

  ```bash
  VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

  VITE_BASEURL=your_base_url
  ```

5.  Run the application:

    ```bash
    npm run dev
    ```

6.  Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

## 🎯 Conclusion

Vibio is a full-stack MERN social media app that combines real-time chat, media sharing, and social networking features with seamless authentication, background jobs, and optimized media storage. Powered by **Clerk**, **Inngest**, and **ImageKit**, it is built to be fast, secure, and scalable for modern social interactions.
