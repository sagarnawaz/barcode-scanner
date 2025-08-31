# 🏗️ Barcode Scanner Project Structure

This document outlines the complete project structure following MVC architecture and best practices for scalability.

## 📁 Overall Project Structure

```
barcode-scanner/
├── 📱 Frontend (React Native/Expo)
│   └── barcode-frontend/
│       ├── src/
│       │   ├── components/          # Reusable UI components
│       │   ├── screens/            # Screen components
│       │   ├── services/           # API and external services
│       │   ├── utils/              # Utility functions and constants
│       │   ├── contexts/           # React contexts (Cart, Auth, etc.)
│       │   └── hooks/              # Custom React hooks
│       ├── assets/                 # Images, fonts, icons
│       ├── App.js                  # Main app component
│       ├── index.js                # App entry point
│       ├── app.json                # Expo configuration
│       ├── package.json            # Frontend dependencies
│       └── README.md               # Frontend documentation
│
├── 🖥️ Backend (Node.js/Express)
│   └── barcode-backend/
│       ├── src/
│       │   ├── config/             # Configuration files
│       │   ├── controllers/        # Business logic layer
│       │   ├── models/             # Data models and database operations
│       │   ├── routes/             # API route definitions
│       │   ├── middleware/         # Custom middleware
│       │   └── app.js              # Main application entry point
│       ├── package.json            # Backend dependencies
│       └── README.md               # Backend documentation
│
└── 📚 Documentation
    ├── PROJECT_STRUCTURE.md        # This file
    └── README.md                   # Main project documentation
```

## 🖥️ Backend Structure (MVC Architecture)

### 📂 `barcode-backend/src/config/`
- **`database.js`** - Supabase configuration and connection setup
- **`environment.js`** - Environment variables and configuration (future)

### 📂 `barcode-backend/src/models/`
- **`Product.js`** - Product data model with CRUD operations
- **`Cart.js`** - Cart data model with cart management operations
- **`User.js`** - User data model (future)
- **`Order.js`** - Order data model (future)

### 📂 `barcode-backend/src/controllers/`
- **`ProductController.js`** - Product business logic and HTTP handling
- **`CartController.js`** - Cart business logic and HTTP handling
- **`UserController.js`** - User management (future)
- **`OrderController.js`** - Order processing (future)

### 📂 `barcode-backend/src/routes/`
- **`productRoutes.js`** - Product API endpoints
- **`cartRoutes.js`** - Cart API endpoints
- **`userRoutes.js`** - User API endpoints (future)
- **`orderRoutes.js`** - Order API endpoints (future)

### 📂 `barcode-backend/src/middleware/`
- **`errorHandler.js`** - Global error handling middleware
- **`validation.js`** - Request validation middleware
- **`auth.js`** - Authentication middleware (future)
- **`rateLimiter.js`** - Rate limiting middleware (future)

### 📂 `barcode-backend/src/`
- **`app.js`** - Main Express application setup

## 📱 Frontend Structure

### 📂 `barcode-frontend/src/components/`
- **`BarcodeScanner.js`** - Barcode scanning component
- **`CartItem.js`** - Individual cart item component
- **`ProductCard.js`** - Product display component
- **`Button.js`** - Reusable button component
- **`Input.js`** - Reusable input component
- **`Modal.js`** - Reusable modal component

### 📂 `barcode-frontend/src/screens/`
- **`HomeScreen.js`** - Main home screen
- **`ScanScreen.js`** - Barcode scanning screen
- **`CartScreen.js`** - Shopping cart screen
- **`PaymentScreen.js`** - Payment processing screen
- **`ProductDetailScreen.js`** - Product details screen
- **`SettingsScreen.js`** - App settings screen

### 📂 `barcode-frontend/src/services/`
- **`api.js`** - API service layer for backend communication
- **`storage.js`** - Local storage service
- **`camera.js`** - Camera and barcode scanning service
- **`payment.js`** - Payment processing service

### 📂 `barcode-frontend/src/utils/`
- **`constants.js`** - Application constants and configuration
- **`helpers.js`** - Utility helper functions
- **`validation.js`** - Frontend validation functions
- **`formatters.js`** - Data formatting utilities

### 📂 `barcode-frontend/src/contexts/`
- **`CartContext.js`** - Shopping cart state management
- **`AuthContext.js`** - Authentication state management
- **`ThemeContext.js`** - App theme management

### 📂 `barcode-frontend/src/hooks/`
- **`useApi.js`** - Custom hook for API calls
- **`useCart.js`** - Custom hook for cart operations
- **`useScanner.js`** - Custom hook for barcode scanning
- **`useStorage.js`** - Custom hook for local storage

### 📂 `barcode-frontend/`
- **`App.js`** - Main application component
- **`index.js`** - App entry point
- **`app.json`** - Expo configuration
- **`package.json`** - Frontend dependencies
- **`assets/`** - Static assets (images, icons, fonts)

## 🔄 Data Flow

### Backend (MVC)
```
HTTP Request → Route → Controller → Model → Database
                ↑                                    ↓
HTTP Response ← Controller ← Model ← Database ← Query
```

### Frontend
```
User Action → Component → Hook/Context → Service → API → Backend
                ↑                                                    ↓
UI Update ← Component ← Hook/Context ← Service ← API ← Backend
```

## 🚀 Scalability Features

### Backend
- **Modular Architecture**: Easy to add new features
- **Middleware Pattern**: Reusable request processing
- **Error Handling**: Centralized error management
- **Validation**: Request data validation
- **Database Abstraction**: Easy to switch databases

### Frontend
- **Component Reusability**: Shared components across screens
- **Service Layer**: Centralized API communication
- **Context Pattern**: Global state management
- **Custom Hooks**: Reusable logic
- **Utility Functions**: Common functionality

## 📊 Database Schema

### Core Tables
```sql
-- Products table
products (id, barcode, name, price, description, category, stock, timestamps)

-- Cart items table
cart_items (id, user_id, product_id, quantity, timestamps)

-- Users table (future)
users (id, email, name, phone, timestamps)

-- Orders table (future)
orders (id, user_id, total, status, timestamps)
```

## 🛠️ Development Workflow

### Backend Development
1. Navigate to `barcode-backend/` directory
2. Add new models in `src/models/`
3. Create controllers in `src/controllers/`
4. Define routes in `src/routes/`
5. Add middleware in `src/middleware/`
6. Test with `npm start` or `npm run dev`

### Frontend Development
1. Navigate to `barcode-frontend/` directory
2. Create components in `src/components/`
3. Add screens in `src/screens/`
4. Implement services in `src/services/`
5. Add utilities in `src/utils/`
6. Test with `npm start`

### Testing & Deployment
1. Test backend API endpoints
2. Test frontend components
3. Deploy backend to hosting service
4. Build and deploy frontend

## 🔧 Configuration

### Environment Variables
```env
# Backend (barcode-backend/.env)
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Frontend (barcode-frontend/.env)
API_BASE_URL=http://localhost:3000/api
HEALTH_CHECK_URL=http://localhost:3000/health
```

### Dependencies
- **Backend**: Express, Supabase, CORS, validation
- **Frontend**: React Native, Expo, navigation, camera

## 📈 Future Enhancements

- **Authentication**: User login/signup system
- **Orders**: Complete order management
- **Analytics**: Usage statistics and reporting
- **Offline Support**: Local data caching
- **Push Notifications**: Real-time updates
- **Multi-language**: Internationalization support

## 🚀 Quick Start

### 1. Start Backend
```bash
cd barcode-backend
npm install
npm start
```

### 2. Start Frontend
```bash
cd barcode-frontend
npm install
npm start
```

### 3. Access Application
- **Backend API**: http://localhost:3000
- **Frontend**: Scan QR code with Expo Go app
- **Health Check**: http://localhost:3000/health

---

This structure provides a solid foundation for a scalable, maintainable barcode scanner application following industry best practices and the MVC architectural pattern.
