# 🔧 **Environment Configuration Guide**

## 📱 **Overview**

This guide will help you set up environment variables for both frontend and backend components of your Barcode Scanner application.

**🚀 NEW ARCHITECTURE:** Frontend now communicates with backend API instead of directly with Supabase!

## 🚀 **Quick Setup**

### **Frontend Setup:**
```bash
cd barcode-frontend
npm run setup:env
```

### **Backend Setup:**
```bash
cd barcode-backend
npm run setup:env
```

## 📁 **Environment Files Structure**

```
barcode-scanner/
├── barcode-frontend/
│   ├── .env                    # Frontend environment variables
│   ├── env.template            # Frontend template (no Supabase needed!)
│   └── setup-env.js           # Frontend setup script
├── barcode-backend/
│   ├── .env                    # Backend environment variables (includes Supabase)
│   ├── env.template            # Backend template
│   └── setup-env.js           # Backend setup script
└── ENVIRONMENT_SETUP.md        # This file
```

## 🔑 **Required Environment Variables**

### **Frontend (.env) - NO SUPABASE NEEDED:**
```env
# Backend API Configuration (Required)
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
EXPO_PUBLIC_HEALTH_CHECK_URL=http://localhost:3000/health

# App Configuration
EXPO_PUBLIC_APP_NAME=Barcode Scanner
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_APP_ENVIRONMENT=development
```

### **Backend (.env) - SUPABASE CREDENTIALS HERE:**
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Supabase Configuration (Backend only!)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Security Configuration
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3000,http://localhost:19006
```

## 🏗️ **New Architecture Benefits**

### **✅ Why This is Better:**

1. **Security:** Supabase credentials only on backend (server-side)
2. **Maintenance:** Single source of truth for database operations
3. **Scalability:** Backend can add caching, validation, business logic
4. **Consistency:** All database operations go through same API layer
5. **Monitoring:** Better tracking of database usage and errors

### **🔄 Data Flow:**
```
Frontend → Backend API → Supabase Database
   ↓           ↓              ↓
  React    Express.js    PostgreSQL
  Native   Node.js       (via Supabase)
```

## 🛠️ **Step-by-Step Setup**

### **Step 1: Get Supabase Credentials**

1. **Go to [supabase.com](https://supabase.com)**
2. **Create a new project** or use existing one
3. **Navigate to Settings → API**
4. **Copy these values for BACKEND only:**
   - **Project URL** → `SUPABASE_URL`
   - **Anon Public Key** → `SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`

### **Step 2: Generate JWT Secret**

```bash
# Generate a random 32-character string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Step 3: Configure Backend (Supabase Credentials)**

```bash
cd barcode-backend

# Run setup script
npm run setup:env

# Edit .env file with your values
# Replace placeholder values with actual Supabase credentials
```

### **Step 4: Configure Frontend (Backend API URLs)**

```bash
cd barcode-frontend

# Run setup script
npm run setup:env

# Edit .env file with your values
# Update API URLs to point to your backend
```

### **Step 5: Verify Configuration**

```bash
# Test backend environment
cd barcode-backend
npm run test

# Test frontend environment
cd barcode-frontend
npm start
```

## 🔒 **Security Best Practices**

### **Never Commit .env Files:**
```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo "*.env" >> .gitignore
```

### **Frontend Security:**
- ✅ **No sensitive credentials** in frontend
- ✅ **Only API endpoints** exposed
- ✅ **Backend handles** all database operations

### **Backend Security:**
- ✅ **Supabase credentials** stored securely
- ✅ **JWT secrets** for authentication
- ✅ **CORS protection** enabled
- ✅ **Rate limiting** implemented

## 🐛 **Troubleshooting**

### **Common Issues:**

1. **"Backend API not found" error:**
   - Check if backend is running on correct port
   - Verify `EXPO_PUBLIC_API_BASE_URL` in frontend .env
   - Test backend health endpoint

2. **"Database connection failed" error:**
   - Check backend .env file for Supabase credentials
   - Verify Supabase project is active
   - Check internet connection

3. **"CORS error" in frontend:**
   - Verify `CORS_ORIGIN` in backend .env includes frontend URL
   - Check if backend CORS middleware is enabled

### **Debug Commands:**

```bash
# Check frontend environment variables
node -e "console.log(process.env.EXPO_PUBLIC_API_BASE_URL)"

# Test backend environment
cd barcode-backend
npm run test

# Test backend health endpoint
curl http://localhost:3000/health
```

## 📚 **Environment Variable Reference**

### **Frontend Variables (No Supabase):**

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `EXPO_PUBLIC_API_BASE_URL` | ✅ | Backend API endpoint | `http://localhost:3000/api` |
| `EXPO_PUBLIC_HEALTH_CHECK_URL` | ✅ | Backend health check | `http://localhost:3000/health` |
| `EXPO_PUBLIC_APP_NAME` | ❌ | Application name | `Barcode Scanner` |
| `EXPO_PUBLIC_APP_VERSION` | ❌ | App version | `1.0.0` |

### **Backend Variables (Includes Supabase):**

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `SUPABASE_URL` | ✅ | Supabase project URL | `https://abc123.supabase.co` |
| `SUPABASE_ANON_KEY` | ✅ | Public API key | `eyJhbGciOiJIUzI1NiIs...` |
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ | Admin API key | `eyJhbGciOiJIUzI1NiIs...` |
| `JWT_SECRET` | ✅ | JWT signing secret | `abc123def456ghi789` |
| `PORT` | ❌ | Server port | `3000` |
| `NODE_ENV` | ❌ | Environment mode | `development` |

## 🚀 **Next Steps**

1. **Complete backend setup** with Supabase credentials
2. **Complete frontend setup** with backend API URLs
3. **Test database connection** with `npm run test`
4. **Start development** with `npm start`
5. **Build production version** when ready

## 🎯 **Support**

- **Supabase Help:** [docs.supabase.com](https://docs.supabase.com)
- **Backend Issues:** Check barcode-backend/README.md
- **Frontend Issues:** Check barcode-frontend/README.md
- **Environment Issues:** Check troubleshooting section above

---

**Your environment is now properly configured with the new architecture! 🎉**
