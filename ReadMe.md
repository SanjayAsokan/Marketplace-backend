📂 Folder & File Structure (Backend - Node.js + Express + MongoDB + JWT Auth)
backend/


/config
   db.js

/controllers
   authController.js
   productController.js
   orderController.js      <-- NEW
   paymentController.js    <-- NEW
   reviewController.js     <-- NEW
   adminController.js      <-- NEW
   reportController.js     <-- NEW

/middlewares
   authMiddleware.js
   roleMiddleware.js
   errorMiddleware.js      <-- NEW (for centralized error handling)

/models
   User.js
   Product.js
   Order.js                <-- NEW
   Payment.js              <-- NEW (optional if storing transactions)
   Review.js               <-- NEW

/routes
   authRoutes.js
   productRoutes.js
   orderRoutes.js          <-- NEW
   paymentRoutes.js        <-- NEW
   reviewRoutes.js         <-- NEW
   adminRoutes.js          <-- NEW
   reportRoutes.js         <-- NEW

/utils
   generateToken.js
   sendEmail.js            <-- for order/payment notifications
   logger.js               <-- optional (for logs)

/server.js





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