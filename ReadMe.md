🛒 Multi-Vendor E-Commerce Backend
---
Backend API for the Multi-Vendor E-Commerce Marketplace.
Provides authentication, product management, cart & orders, vendor onboarding, and admin features.

🔗 Live API: https://ecommerce-backend-v6q2.onrender.com

---
📌 Introduction

This backend powers the multi-vendor marketplace where customers can browse products, vendors can manage their own shops, and admins oversee the entire platform.
Built using Node.js, Express, MongoDB, and JWT for secure role-based authentication.

---
✨ Features

👤 User

  Register & Login (JWT authentication)

  Browse products across vendors

  Add to cart & place orders

  View order history


🛍 Vendor

  Create, edit, and delete products

  Manage inventory & pricing

  Track sales and performance
  

🛡 Admin

  Manage vendors (approve, suspend, delete)

  Manage products across vendors

  View analytics & revenue reports
  

🛠 Tech Stack

  Node.js – JavaScript runtime

  Express.js – Web framework

  MongoDB + Mongoose – Database & ORM

  JWT (JSON Web Token) – Authentication

  Bcrypt – Password hashing

  Multer / Cloud Storage – Product image upload

  CORS – Secure cross-origin requests

  ---

📂 Project Structure
backend/
│── src/
│   ├── config/         # DB & JWT config
│   ├── controllers/    # Route controllers (business logic)
│   ├── middlewares/    # Auth & validation middleware
│   ├── models/         # Mongoose models (User, Vendor, Product, Order)
│   ├── routes/         # API routes
│   └── server.js       # Main entry point
│
│── .env                # Environment variables
│── package.json
│── README.md

---
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/your-username/multivendor-backend.git
cd multivendor-backend

2. Install dependencies
npm install

3. Setup environment variables (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_STORAGE_KEY=your_cloud_key

4. Run the server
npm run dev

---
📡 API Documentation

You can explore API endpoints using tools like Postman or Swagger.

Example routes:

POST /api/auth/register – Register user

POST /api/auth/login – Login user

GET /api/products – Fetch all products

POST /api/vendor/products – Vendor adds new product

POST /api/orders – Place order

---
🤝 Contributing

Contributions are welcome 🎉

Fork the repository

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Added feature"

Push to your branch: git push origin feature-name

Open a Pull Request 🚀

---
📜 License

This project is licensed under the MIT License.
