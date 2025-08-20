📂 Folder & File Structure (Backend - Node.js + Express + MongoDB + JWT Auth)
backend/
│── config/
│   └── db.js                # MongoDB connection setup
│
│── controllers/
│   ├── authController.js    # Login, Signup, JWT handling
│   ├── userController.js    # User CRUD operations
│   └── roleController.js    # Role management (if RBAC)
│
│── middlewares/
│   ├── authMiddleware.js    # JWT verification
│   └── roleMiddleware.js    # Role-based access control
│
│── models/
│   ├── User.js              # User Schema
│   └── Role.js              # Role Schema
│
│── routes/
│   ├── authRoutes.js        # Login/Signup API endpoints
│   ├── userRoutes.js        # User-related endpoints
│   └── roleRoutes.js        # Role-related endpoints
│
│── utils/
│   └── generateToken.js     # Helper function for JWT
│
│── .env                     # Secrets (DB URI, JWT_SECRET, PORT)
│── package.json             
│── server.js                # Entry point

📦 Packages Needed

Run this inside backend folder:

npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
npm install --save-dev nodemon


express → Web framework

mongoose → MongoDB ORM

bcryptjs → Password hashing

jsonwebtoken → JWT authentication

dotenv → Manage environment variables

cors → Allow cross-origin requests (for frontend)

nodemon → Auto-restart server in dev mode

⚡ Flow of MVC

server.js → starts app & loads routes.

routes/ → defines endpoints (e.g., /api/auth/login).

controllers/ → logic for each route (login, signup, etc.).

models/ → defines MongoDB schema.

middlewares/ → protects routes (JWT, roles).

config/db.js → connects MongoDB.

utils/ → helper functions (like JWT generator).