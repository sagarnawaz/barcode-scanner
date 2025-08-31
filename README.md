# 🏗️ Barcode Scanner Project

A complete, scalable barcode scanning application with a modern mobile frontend and robust backend API, built using industry best practices and MVC architecture.

## 🎯 Project Overview

This project consists of two main components:
- **📱 Frontend**: React Native/Expo mobile application (Expo Go compatible)
- **🖥️ Backend**: Node.js/Express API with MVC architecture

## 🚀 Features

- **Barcode Input**: Manual barcode entry with demo mode
- **Shopping Cart**: Full cart management system
- **Product Database**: Supabase-powered data storage
- **RESTful API**: Clean, documented backend endpoints
- **Mobile-First**: Optimized for mobile devices
- **Expo Go Compatible**: No native builds required
- **Scalable Architecture**: Easy to extend and maintain

## 📁 Project Structure

```
barcode-scanner/
├── 📱 barcode-frontend/          # React Native/Expo frontend
├── 🖥️ barcode-backend/          # Node.js/Express backend
├── 📚 Documentation/             # Project documentation
└── 📖 README.md                  # This file
```

## 🛠️ Technology Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Screen navigation
- **Context API** - State management
- **Manual Input** - Barcode entry without camera

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - Database and authentication
- **MVC Architecture** - Clean code organization
- **JWT Authentication** - Secure user sessions

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Expo Go app on your mobile device
- Supabase account

### 1. Clone Repository
```bash
git clone <repository-url>
cd barcode-scanner
```

### 2. Start Backend
```bash
cd barcode-backend
npm install
npm start
```

### 3. Start Frontend
```bash
cd barcode-frontend
npm install
npm start
```

### 4. Access Application
- **Backend API**: http://localhost:3000
- **Frontend**: Scan QR code with Expo Go app
- **Health Check**: http://localhost:3000/health

## 📚 Documentation

- **[Project Structure](PROJECT_STRUCTURE.md)** - Complete project architecture
- **[Backend README](barcode-backend/README.md)** - Backend API documentation
- **[Frontend README](barcode-frontend/README.md)** - Frontend development guide

## 🔧 Configuration

### Environment Variables

#### Backend (barcode-backend/.env)
```env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

#### Frontend (barcode-frontend/.env)
```env
API_BASE_URL=http://localhost:3000/api
HEALTH_CHECK_URL=http://localhost:3000/health
```

## 🗄️ Database Schema

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

## 📱 API Endpoints

### Health Check
- `GET /health` - Server and database health status

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/barcode/:barcode` - Get product by barcode
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:cartItemId/quantity` - Update quantity
- `DELETE /api/cart/:cartItemId` - Remove item
- `DELETE /api/cart/:userId/clear` - Clear cart

## 🏗️ Architecture

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

## 🚀 Development Workflow

### Backend Development
1. Navigate to `barcode-backend/` directory
2. Add new models in `src/models/`
3. Create controllers in `src/controllers/`
4. Define routes in `src/routes/`
5. Test with `npm start` or `npm run dev`

### Frontend Development
1. Navigate to `barcode-frontend/` directory
2. Create components in `src/components/`
3. Add screens in `src/screens/`
4. Implement services in `src/services/`
5. Test with `npm start`

## 🧪 Testing

- **Backend**: API endpoint testing with Postman/Insomnia
- **Frontend**: Component testing with React Native Testing Library
- **Integration**: End-to-end testing with Expo Go
- **Performance**: Load testing with Artillery

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set environment variables on hosting platform
3. Deploy to Heroku, Vercel, or AWS

### Frontend Deployment
1. Build for production: `expo build:android` or `expo build:ios`
2. Publish to app stores
3. Deploy web version: `expo build:web`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please:
- Check the documentation
- Search existing issues
- Create a new issue with detailed information
- Contact the development team

## 📈 Future Enhancements

- **Real Camera Integration**: Native camera barcode scanning
- **Authentication**: User login/signup system
- **Orders**: Complete order management
- **Analytics**: Usage statistics and reporting
- **Offline Support**: Local data caching
- **Push Notifications**: Real-time updates
- **Multi-language**: Internationalization support
- **Admin Panel**: Web-based administration interface

## 🔗 Related Links

- **Backend Repository**: [barcode-backend](barcode-backend/)
- **Frontend Repository**: [barcode-frontend](barcode-frontend/)
- **API Documentation**: [Backend README](barcode-backend/README.md)
- **Frontend Guide**: [Frontend README](barcode-frontend/README.md)
- **Project Structure**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

Built with ❤️ using modern web technologies and best practices.

**Happy Coding! 🚀**
