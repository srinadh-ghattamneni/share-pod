# File Share App 🚀

A full-stack file sharing application with user authentication, file uploads, and a modern React frontend. This project is organized into two main folders: `client` (React frontend) and `server` (Node.js/Express backend).

---

## Features ✨
- User authentication (signup, login, protected routes)
- File upload and management
- Dashboard for users
- Cloudinary integration for file storage
- Secure API endpoints
- Modern UI with React

---

## Project Structure 🗂️

```
root/
│
├── client/                # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components (Dashboard, LandingPage)
│   │   ├── api.js         # API utility functions
│   │   └── ...            # Other React files
│   ├── package.json       # Frontend dependencies
│   └── ...
│
├── server/                # Node.js/Express backend
│   ├── config/            # Configuration files (db, cloudinary)
│   ├── middleware/        # Express middleware (auth)
│   ├── models/            # Mongoose models (User, File)
│   ├── routes/            # API routes (auth, file)
│   ├── utils/             # Utility scripts (cleanup)
│   ├── index.js           # Entry point for backend
│   ├── package.json       # Backend dependencies
│   └── ...
│
└── .gitignore             # Git ignore rules
```

---

## Getting Started 🏁

### Prerequisites 📋
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account (for file storage)

### 1. Clone the repository

```sh
git clone <repo-url>
cd file_share_3_working
```

### 2. Setup the Backend 🛠️
```sh
cd server
npm install
# Create a .env file with MongoDB and Cloudinary credentials
npm start
```

#### Example `.env` for server:
```
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

### 3. Setup the Frontend 💻
```sh
cd ../client
npm install
npm start
```

The React app will run on [http://localhost:3000](http://localhost:3000) by default.

---

## Scripts 📜

### Backend (from `server/`):
- `npm start` — Start the Express server

### Frontend (from `client/`):
- `npm start` — Start the React development server
- `npm test` — Run frontend tests

---



## Environment Variables 🔑
- Place your environment variables in `.env` files in the respective folders (`server/.env`, `client/.env` if needed).

---



## Author 👤
- Srinadh Ghattamneni

<p align="center">
  <b>Thank you for checking out this project! If you found it useful, please consider giving it a ⭐ on GitHub.</b>
</p>
