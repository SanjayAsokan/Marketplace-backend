🛒 Multi-Vendor E-Commerce Backend

This is the backend API for the Multi-Vendor E-Commerce Marketplace.
It powers the platform with authentication, product management, cart & orders, vendor controls, and admin features.

Built using Node.js, Express, and MongoDB, with JWT authentication for secure access.


Deploy Link: https://ecommerce-backend-v6q2.onrender.com

🚀 Features
👤 User

Register & Login (JWT authentication)

Browse products across vendors

Add to cart & place orders

View order history

🛍 Vendor

Create, edit, and delete products

Manage inventory and pricing

Track sales

🛡 Admin

Manage vendors (approve, suspend, delete)

Manage products across vendors

View analytics & revenue reports

🛠 Tech Stack

Node.js – JavaScript runtime

Express.js – Web framework

MongoDB + Mongoose – Database

JWT (JSON Web Tokens) – Authentication

Bcrypt – Password hashing

Multer / Cloud Storage – Product image upload

Cors – Secure cross-origin requests

📂 Project Structure
backend/
│── src/
│   ├── config/             # DB & JWT config
│   ├── controllers/        # Route controllers (business logic)
│   ├── middlewares/        # Auth & validation
│   ├── models/             # Mongoose models (User, Vendor, Product, Order)
│   ├── routes/             # API routes
│   ├── utils/              # Helpers (email, validation, etc.)
│   └── server.js           # Main entry point
│── .env                    # Environment variables
│── package.json
│── README.md
