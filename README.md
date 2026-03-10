# ShopEase - Premium MERN E-Commerce Platform

ShopEase is a modern, high-performance e-commerce website built with the MERN stack (MongoDB, Express, React, Node.js). It features a premium "Glassmorphism" UI design, real-world product data integration from Flipkart, and a fully functional checkout flow connected to MongoDB Atlas.

## 🌟 Features

- **Premium UI/UX:** Dark theme with glassmorphism effects, smooth animations, and responsive design.
- **Product Discovery:** Browse a high-quality dataset of 100 products integrated from the Flipkart ecommerce sample.
- **Advanced Shopping Cart:** Persistent cart state with quantity management and order summary.
- **Authenticated Checkout:** Secure user registration, login, and multi-step checkout flow (Shipping -> Payment -> Review).
- **MongoDB Atlas Integration:** Cloud-hosted database for persistent order and user data.
- **Admin Dashboard:** Initial infrastructure for managing products.

## 🚀 Tech Stack

- **Frontend:** React (Vite), React Router, Axios, Lucide-React, Vanilla CSS3.
- **Backend:** Node.js, Express, Mongoose, JWT Authentication.
- **Database:** MongoDB Atlas.
- **Tools:** CSV-Parse (for Flipkart dataset integration).

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/CHETHANCHARMANNAPK/ecommerce-platform-mern.git
cd ecommerce-platform-mern
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```
Start the server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the development server:
```bash
npm run dev
```

## 📊 Database Seeding
To populate the database with the Flipkart dataset, run:
```bash
cd backend
node seeder.js
```

## 🛠️ Recent Improvements
- **Checkout Flow Reliability:** Fixed relative route issues that caused blank pages during checkout.
- **Order Structure Alignment:** Synchronized frontend request payloads with backend Mongoose models to support detailed order histories.
- **CSV Data Integrity:** Implemented robust multi-line CSV parsing for complex product descriptions.

## 📄 License
This project is licensed under the MIT License.
