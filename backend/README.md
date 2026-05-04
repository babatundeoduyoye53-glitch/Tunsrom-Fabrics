# Tunsrom Fabrics — Backend

Express + MongoDB REST API for the Tunsrom Fabrics e-commerce store.

## Stack
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication
- Multer (image uploads)
- bcrypt (password hashing)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in this folder:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tunsromfabrics
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   ADMIN_EMAIL=admin@tunsromfabrics.com
   ADMIN_PASSWORD=admin123
   ```

3. Seed the database (run once):
   ```bash
   npm run seed
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List all products |
| POST | /api/products | Create product (admin) |
| PUT | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |
| POST | /api/auth/register | Customer register |
| POST | /api/auth/login | Customer login |
| GET | /api/auth/me | Get current user |
| POST | /api/orders | Place order |
| GET | /api/orders/my | Customer order history |
| GET | /api/orders/track/:ref | Track order by reference |
| GET | /api/orders | All orders (admin) |
| PATCH | /api/orders/:id/status | Update order status (admin) |
| POST | /api/admin/auth/login | Admin login |
| GET | /api/admin/stats | Dashboard stats (admin) |
| GET | /api/settings | Get settings (admin) |
| PATCH | /api/settings/store-info | Update store info (admin) |
| PATCH | /api/settings/whatsapp | Update WhatsApp config (admin) |
| GET | /api/settings/public | Public store config |
