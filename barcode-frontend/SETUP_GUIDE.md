# 🚀 **Real Barcode Scanning Setup Guide**

## 📱 **Overview**

Your Barcode Scanner app now supports **real camera barcode scanning** with **Supabase database integration**! This guide will help you set up the complete system.

## ⚠️ **Important: Expo Go vs Development Builds**

### **Expo Go (Current Demo):**
- ✅ Manual barcode input
- ✅ Shopping cart functionality
- ✅ Payment simulation
- ❌ **No camera access** (limited by Expo Go)

### **Development Build (Required for Camera):**
- ✅ **Real camera barcode scanning**
- ✅ **Supabase database integration**
- ✅ **Full app functionality**
- ✅ **Native device features**

## 🛠️ **Setup Steps**

### **Step 1: Install Dependencies**
```bash
cd barcode-frontend
npm install
```

### **Step 2: Configure Supabase**

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Create environment file:**
   ```bash
   # Create .env file in barcode-frontend directory
   touch .env
   ```

3. **Add your Supabase credentials:**
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### **Step 3: Set Up Database Tables**

Run these SQL commands in your Supabase SQL editor:

```sql
-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  barcode VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  stock INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (demo purposes)
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public access to cart_items" ON cart_items
  FOR ALL USING (true);

CREATE POLICY "Allow public access to orders" ON orders
  FOR ALL USING (true);
```

### **Step 4: Test with Expo Go (Limited)**

```bash
npm start
# Scan QR code with Expo Go
# Test manual input and cart functionality
```

### **Step 5: Build Development Version (Full Camera Access)**

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 📱 **App Features**

### **Real Barcode Scanning:**
- **Supported Formats:** EAN-13, EAN-8, Code 128, Code 39, UPC-A, UPC-E
- **Camera Integration:** Real-time barcode detection
- **Product Lookup:** Automatic database search
- **Add New Products:** Create products for unknown barcodes

### **Shopping Cart:**
- **Database Storage:** Cart items saved to Supabase
- **Quantity Management:** Add, remove, update quantities
- **Real-time Sync:** Cart data persists across sessions

### **Payment Processing:**
- **Order Creation:** Orders saved to database
- **Payment Methods:** Multiple payment options
- **Order History:** Track completed orders

## 🔧 **Configuration Options**

### **Environment Variables:**
```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# App Configuration
EXPO_PUBLIC_APP_NAME=Barcode Scanner
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### **Database Schema:**
- **Products:** Barcode, name, price, description, category, stock
- **Cart Items:** User ID, product ID, quantity
- **Orders:** User ID, total amount, status, items

## 🚀 **Testing Your Setup**

### **1. Database Connection:**
- Check Supabase dashboard for connection status
- Verify tables are created correctly
- Test with sample data

### **2. Camera Permissions:**
- Grant camera access when prompted
- Test barcode scanning with known products
- Verify product lookup works

### **3. Cart Functionality:**
- Add products to cart
- Update quantities
- Verify data persistence

### **4. Payment Flow:**
- Complete checkout process
- Verify order creation
- Check order history

## 🐛 **Troubleshooting**

### **Common Issues:**

1. **Camera not working:**
   - Ensure you're using Development Build, not Expo Go
   - Check camera permissions
   - Verify device supports camera

2. **Database connection failed:**
   - Check Supabase credentials
   - Verify internet connection
   - Check Supabase project status

3. **Barcode not recognized:**
   - Ensure barcode is clear and well-lit
   - Check supported barcode formats
   - Verify barcode is valid

4. **App crashes:**
   - Check console for error messages
   - Verify all dependencies are installed
   - Clear app cache and restart

## 📚 **Next Steps**

1. **Complete Setup:** Follow all setup steps above
2. **Test Functionality:** Verify all features work correctly
3. **Add Sample Data:** Populate database with test products
4. **Customize UI:** Adjust styling and branding
5. **Deploy:** Build production version for app stores

## 🎯 **Support**

- **Documentation:** Check Supabase docs for database help
- **Expo Docs:** Camera and barcode scanning guides
- **Issues:** Report bugs in project repository

---

**Your app is now ready for real barcode scanning! 🚀**
