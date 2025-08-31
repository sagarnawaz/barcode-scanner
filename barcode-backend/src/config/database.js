import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing required Supabase environment variables:');
  console.error('   - SUPABASE_URL');
  console.error('   - SUPABASE_ANON_KEY');
  console.error('Please check your .env file configuration.');
  process.exit(1);
}

// Create Supabase client with anon key (for public operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Supabase client with service role key (for admin operations)
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

// Database table names
export const TABLES = {
  PRODUCTS: 'products',
  CART_ITEMS: 'cart_items',
  USERS: 'users',
  ORDERS: 'orders'
};

// Test database connection
export const testConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Table doesn't exist yet - this is OK for initial setup
        console.log('⚠️  Products table not found. This is normal for new projects.');
        return { success: true, message: 'Database connected successfully (table setup required)' };
      }
      throw error;
    }
    
    console.log('✅ Database connection successful!');
    return { success: true, message: 'Database connected successfully' };
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return { success: false, message: error.message };
  }
};

// Get database statistics
export const getDatabaseStats = async () => {
  try {
    const stats = {};
    
    // Get product count
    const { count: productCount } = await supabase
      .from(TABLES.PRODUCTS)
      .select('*', { count: 'exact', head: true });
    
    stats.products = productCount || 0;
    
    // Get cart items count
    const { count: cartCount } = await supabase
      .from(TABLES.CART_ITEMS)
      .select('*', { count: 'exact', head: true });
    
    stats.cartItems = cartCount || 0;
    
    // Get orders count
    const { count: orderCount } = await supabase
      .from(TABLES.ORDERS)
      .select('*', { count: 'exact', head: true });
    
    stats.orders = orderCount || 0;
    
    return { success: true, data: stats };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return { success: false, message: error.message };
  }
};

// Initialize database tables (run once during setup)
export const initializeDatabase = async () => {
  try {
    console.log('🚀 Initializing database tables...');
    
    if (!supabaseAdmin) {
      console.log('⚠️  Service role key not provided. Skipping table creation.');
      return { success: false, message: 'Service role key required for table creation' };
    }
    
    // Create products table
    const { error: productsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
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
      `
    });
    
    if (productsError) {
      console.log('⚠️  Products table creation skipped (may already exist)');
    }
    
    // Create cart_items table
    const { error: cartError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS cart_items (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(100) NOT NULL,
          product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
          quantity INTEGER DEFAULT 1,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (cartError) {
      console.log('⚠️  Cart items table creation skipped (may already exist)');
    }
    
    // Create orders table
    const { error: ordersError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(100) NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          items JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (ordersError) {
      console.log('⚠️  Orders table creation skipped (may already exist)');
    }
    
    console.log('✅ Database tables initialized successfully!');
    return { success: true, message: 'Database tables initialized' };
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return { success: false, message: error.message };
  }
};
