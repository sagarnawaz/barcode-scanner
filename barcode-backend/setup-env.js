#!/usr/bin/env node

/**
 * Backend Environment Setup Script for Barcode Scanner
 * This script helps you set up your backend environment configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Barcode Scanner Backend Environment Setup');
console.log('============================================\n');

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
  console.log('   2. Replace placeholder values with your actual credentials');
  console.log('   3. Save the file');
  console.log('\n🔑 Required values:');
  console.log('   - SUPABASE_URL');
  console.log('   - SUPABASE_ANON_KEY');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY (optional, for table creation)');
  console.log('   - JWT_SECRET (generate a random string)');
  console.log('\n🔧 Optional but recommended:');
  console.log('   - DATABASE_URL (for direct database access)');
  console.log('\n📚 For help setting up Supabase, see README.md');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}
