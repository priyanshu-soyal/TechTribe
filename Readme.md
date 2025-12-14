# TechTribe 🚀

A modern full-stack blogging platform built with the MERN stack, featuring a beautiful UI with dark mode support, rich text editing, and cloud-based image storage.

## ✨ Features

### User Management

- 🔐 User authentication (signup, login, logout)
- 👤 User profiles with customizable information
- 🔑 JWT-based authentication with secure cookies
- 🛡️ Password encryption using bcryptjs

### Blog Functionality

- ✍️ Create, read, update, and delete blog posts
- 📝 Rich text editor with Jodit React
- 🖼️ Image upload with Cloudinary integration
- 📱 Responsive blog cards and detailed blog views
- 🔍 Browse and search blogs
- 📊 Personal dashboard for managing your blogs

### Comments & Interaction

- 💬 Comment system on blog posts
- 🗨️ Real-time comment updates
- 👥 User engagement features

### UI/UX

- 🌓 Dark/Light theme toggle
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 📱 Fully responsive design
- ⚡ Fast and smooth navigation with React Router
- 🎯 Beautiful hero section and landing page

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Redux Persist** - Persist Redux state
- **React Router DOM** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Radix UI** - Accessible UI primitives
- **Jodit React** - Rich text editor
- **Axios** - HTTP client
- **Lucide React & React Icons** - Icon libraries
- **Next Themes** - Theme management
- **Sonner** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and management
- **Multer** - File upload middleware
- **Cookie Parser** - Parse cookies
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
TechTribe/
├── Backend/
│   ├── controllers/          # Business logic
│   │   ├── blogController.js
│   │   ├── commentsContoller.js
│   │   └── userController.js
│   ├── Database/             # Database configuration
│   │   └── DB.js
│   ├── middlewares/          # Custom middleware
│   │   └── isAuthenticated.js
│   ├── models/               # Mongoose schemas
│   │   ├── BlogModel.js
│   │   ├── CommentModel.js
│   │   └── UserModel.js
│   ├── routes/               # API routes
│   │   ├── blogRoute.js
│   │   ├── commentRoute.js
│   │   └── userRoute.js
│   ├── utils/                # Utility functions
│   │   └── cloudinary.js
│   ├── package.json
│   └── server.js             # Entry point
│
└── Frontend/
    ├── src/
    │   ├── Components/       # Reusable components
    │   │   ├── ui/          # shadcn/ui components
    │   │   ├── BlogCard.jsx
    │   │   ├── BlogCardList.jsx
    │   │   ├── CommentBox.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── RecentBlog.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── themeProvider.jsx
    │   ├── Layout/          # Layout components
    │   │   └── Layout.jsx
    │   ├── pages/           # Page components
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── Blogs.jsx
    │   │   ├── BlogView.jsx
    │   │   ├── CreateBlog.jsx
    │   │   ├── UpdateBlog.jsx
    │   │   ├── YourBlog.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── Redux/           # State management
    │   │   ├── Store.js
    │   │   ├── authSlice.js
    │   │   ├── blogSlice.js
    │   │   ├── CommentSlice.js
    │   │   └── themeSlice.js
    │   ├── lib/             # Utility functions
    │   │   └── utils.js
    │   ├── App.jsx          # Main app component
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Global styles
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account for image storage

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Priyanshu-Soyal/TechTribe.git
   cd TechTribe
   ```

2. **Backend Setup**

   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Frontend Setup**

   ```bash
   cd ../Frontend
   npm install
   ```

   Create a `.env` file in the Frontend directory:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd Backend
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**

   ```bash
   cd Frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## 🎨 Features in Detail

### Rich Text Editor

- Powered by Jodit React for a smooth writing experience
- Support for formatting, images, links, and more
- Preview mode available

### Theme Support

- System preference detection
- Manual toggle between light and dark modes
- Persistent theme selection using Redux Persist

### Image Management

- Cloudinary integration for optimal image storage
- Automatic image optimization and CDN delivery
- Support for multiple image formats

### State Management

- Redux Toolkit for efficient state management
- Separate slices for auth, blogs, comments, and theme
- Redux Persist for maintaining state across sessions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Priyanshu Soyal**

---

⭐ If you found this project helpful, please give it a star!
