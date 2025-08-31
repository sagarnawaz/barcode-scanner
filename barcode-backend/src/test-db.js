#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Tests the Supabase database connection
 */

import { testConnection, getDatabaseStats, initializeDatabase } from './config/database.js';

console.log('🔍 Testing Database Connection...');
console.log('================================\n');

async function runTests() {
  try {
    // Test 1: Basic Connection
    console.log('1️⃣ Testing basic database connection...');
    const connectionResult = await testConnection();
    
    if (connectionResult.success) {
      console.log('✅ Connection successful:', connectionResult.message);
    } else {
      console.log('❌ Connection failed:', connectionResult.message);
      return;
    }

    console.log('\n2️⃣ Getting database statistics...');
    const statsResult = await getDatabaseStats();
    
    if (statsResult.success) {
      const stats = statsResult.data;
      console.log('✅ Database stats retrieved:');
      console.log(`   📦 Products: ${stats.products}`);
      console.log(`   🛒 Cart Items: ${stats.cartItems}`);
      console.log(`   📋 Orders: ${stats.orders}`);
    } else {
      console.log('⚠️  Could not get stats:', statsResult.message);
    }

    console.log('\n3️⃣ Testing table initialization...');
    const initResult = await initializeDatabase();
    
    if (initResult.success) {
      console.log('✅ Database tables initialized:', initResult.message);
    } else {
      console.log('⚠️  Table initialization:', initResult.message);
    }

    console.log('\n🎉 Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the tests
runTests();
