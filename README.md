# Yggdrasil Landing Website

A modern, mythologically-inspired landing website for Yggrasoft Labs built with the MERN stack (MongoDB, Express, React, Node.js).

## 🌳 About

Yggrasoft Labs is dedicated to developing, funding, and deploying real-world solutions across multiple domains including technology, agriculture, education, stock markets, job markets, healthcare, and more. The organization's identity is inspired by Yggdrasil, the World Tree from Norse mythology, symbolizing interconnected growth and support across different realms.

## 🎨 Design Theme

The website embodies the Yggdrasil mythology through:
- **Color Palette**: Gold (#8C7231, #A89048) and Teal (#365265, #4A7A8A) with dark accents (#5d1B2C, #213127, #010202)
- **Visual Elements**: Tree-inspired designs, organic flowing animations, Norse-inspired patterns
- **Typography**: Cinzel for headings, Inter for body text, Marcellus for accents

## 🛠️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls
- **React Hook Form** for form management

### Backend
- **Node.js 18+** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Nodemailer** for email notifications
- **Helmet** for security
- **Morgan** for logging

## 📁 Project Structure

```
yggdrasil-landing/
├── assets/                # Project assets (logos, images, etc.)
│   ├── favicon.png
│   └── full picture with background.png
│
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── styles/        # Global styles
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── utils/        # Utility functions
│   └── package.json
│
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yggdrasil-landing
   ```

2. **Install all dependencies (root, client, and server)**
   ```bash
   npm run install:all
   ```
   
   Or install manually:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

4. **Set up environment variables**

   Create `.env` file in the `client` folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Create `.env` file in the `server` folder:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_app_password
   CONTACT_EMAIL=contact@yggrasoft.com
   CORS_ORIGIN=http://localhost:3000
   ```

### Running the Application

1. **Seed the database (first time only)**
   ```bash
   cd server
   npm run seed
   ```
   This will populate the database with initial domains and settings.

2. **Start both frontend and backend together**
   ```bash
   npm run dev
   ```
   - Server will run on http://localhost:5000
   - Client will run on http://localhost:3000
   
   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run dev:server
   
   # Terminal 2 - Frontend
   npm run dev:client
   ```

## 📝 Available Scripts

### Root
- `npm run dev` - Start both frontend and backend concurrently
- `npm run dev:server` - Start backend only
- `npm run dev:client` - Start frontend only
- `npm run install:all` - Install dependencies for root, client, and server
- `npm run build` - Build both frontend and backend

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run seed` - Seed database with initial data
- `npm run lint` - Run ESLint

## 🎯 Features

- ✅ Responsive design (320px to 2560px)
- ✅ Smooth animations with Framer Motion
- ✅ Particle background effects
- ✅ Scroll-triggered animations
- ✅ Dynamic domains showcase
- ✅ Projects portfolio section
- ✅ Contact form with email notifications
- ✅ Newsletter subscription
- ✅ Dynamic content from MongoDB
- ✅ WCAG 2.1 Level AA accessibility
- ✅ Reduced motion support
- ✅ SEO optimized

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator
- Rate limiting on API endpoints
- Environment variable protection

## 📱 Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 13+
- Chrome Mobile: Last 2 versions

## 🤝 Contributing

This is a private project for Yggrasoft Labs. For any questions or contributions, please contact the development team.

## 📄 License

Copyright © 2025 Yggrasoft Labs. All rights reserved.

## 🌟 Acknowledgments

Inspired by Yggdrasil, the World Tree from Norse mythology, representing interconnected growth and support across different realms.
