# Barcode Scanner Backend API

A scalable, MVC-architected backend API for the Barcode Scanner application built with Node.js, Express, and Supabase.

## 🏗️ Architecture

This project follows the **Model-View-Controller (MVC)** pattern for clean separation of concerns and scalability:

```
src/
├── config/          # Configuration files (database, environment)
├── controllers/     # Business logic and request handling
├── models/         # Data models and database operations
├── routes/         # API route definitions
├── middleware/     # Custom middleware (validation, error handling)
└── app.js         # Main application entry point
```

## 🚀 Features

- **MVC Architecture**: Clean separation of concerns
- **RESTful API**: Standard HTTP methods and status codes
- **Error Handling**: Comprehensive error handling middleware
- **Validation**: Request validation middleware
- **Database**: Supabase integration for data persistence
- **CORS**: Cross-origin resource sharing enabled
- **Logging**: Request logging middleware

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Supabase account and project

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd barcode-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Health Check
- `GET /health` - Server and database health status

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/barcode/:barcode` - Get product by barcode
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `GET /api/cart/:userId/summary` - Get cart summary
- `GET /api/cart/:userId/total` - Get cart total
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:cartItemId/quantity` - Update cart item quantity
- `DELETE /api/cart/:cartItemId` - Remove item from cart
- `DELETE /api/cart/:userId/clear` - Clear user's cart

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  barcode VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  category VARCHAR,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm test` - Run tests (to be implemented)

### Code Structure

#### Models
Models handle data access and business logic:
- `Product.js` - Product data operations
- `Cart.js` - Cart data operations

#### Controllers
Controllers handle HTTP requests and responses:
- `ProductController.js` - Product-related operations
- `CartController.js` - Cart-related operations

#### Routes
Routes define API endpoints:
- `productRoutes.js` - Product API routes
- `cartRoutes.js` - Cart API routes

#### Middleware
Custom middleware for common functionality:
- `errorHandler.js` - Global error handling
- `validation.js` - Request validation

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `SUPABASE_URL` | Supabase project URL | Required |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Required |

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables** on your hosting platform

3. **Start the server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.
