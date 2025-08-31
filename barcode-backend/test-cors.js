#!/usr/bin/env node

/**
 * CORS Test Script
 * Tests CORS configuration for the backend API
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testCORS() {
  console.log('🔍 Testing CORS Configuration...');
  console.log('================================\n');

  try {
    // Test 1: Basic GET request
    console.log('1️⃣ Testing GET request...');
    const getResponse = await fetch(`${BASE_URL}/health`);
    console.log(`   Status: ${getResponse.status}`);
    console.log(`   CORS Headers:`, {
      'Access-Control-Allow-Origin': getResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': getResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': getResponse.headers.get('Access-Control-Allow-Headers')
    });

    // Test 2: OPTIONS preflight request
    console.log('\n2️⃣ Testing OPTIONS preflight...');
    const optionsResponse = await fetch(`${BASE_URL}/api/products`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:19006',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log(`   Status: ${optionsResponse.status}`);
    console.log(`   CORS Headers:`, {
      'Access-Control-Allow-Origin': optionsResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': optionsResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': optionsResponse.headers.get('Access-Control-Allow-Headers')
    });

    // Test 3: POST request with CORS
    console.log('\n3️⃣ Testing POST request...');
    const postResponse = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:19006'
      },
      body: JSON.stringify({
        barcode: '1234567890123',
        name: 'Test Product',
        price: 9.99
      })
    });
    
    console.log(`   Status: ${postResponse.status}`);
    console.log(`   CORS Headers:`, {
      'Access-Control-Allow-Origin': postResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': postResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': postResponse.headers.get('Access-Control-Allow-Headers')
    });

    console.log('\n🎉 CORS test completed!');
    
  } catch (error) {
    console.error('❌ CORS test failed:', error.message);
    console.log('\n💡 Make sure the backend server is running:');
    console.log('   npm run dev');
  }
}

// Run the test
testCORS();
