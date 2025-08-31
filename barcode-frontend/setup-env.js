#!/usr/bin/env node

/**
 * Frontend Environment Setup Script for Barcode Scanner
 * This script helps you set up your frontend environment configuration
 * 
 * Note: Frontend now communicates with backend API instead of directly with Supabase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Barcode Scanner Frontend Environment Setup');
console.log('=============================================\n');

// Check if .env file already exists
const envPath = path.join(__dirname, '.env');
const envTemplatePath = path.join(__dirname, 'env.template');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('   If you want to reconfigure, delete the existing .env file first.\n');
  process.exit(0);
}

// Check if template exists
if (!fs.existsSync(envTemplatePath)) {
  console.error('❌ env.template file not found!');
  console.log('   Please ensure env.template exists in the current directory.\n');
  process.exit(1);
}

try {
  // Read template
  const template = fs.readFileSync(envTemplatePath, 'utf8');
  
  // Create .env file
  fs.writeFileSync(envPath, template);
  
  console.log('✅ .env file created successfully!');
  console.log('\n📝 Next steps:');
  console.log('   1. Open .env file in your editor');
  console.log('   2. Update backend API URLs if needed');
  console.log('   3. Save the file');
  console.log('\n🔑 Required configuration:');
  console.log('   - EXPO_PUBLIC_API_BASE_URL (backend API endpoint)');
  console.log('   - EXPO_PUBLIC_HEALTH_CHECK_URL (backend health check)');
  console.log('\n💡 Architecture change:');
  console.log('   - Frontend no longer needs Supabase credentials');
  console.log('   - All database operations go through backend API');
  console.log('   - Backend handles Supabase communication');
  console.log('\n📚 For backend setup, see barcode-backend/README.md');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}
