// supabase.js (in Expo React Native)
import { createClient } from '@supabase/supabase-js'

// ✅ Replace these with your real Supabase project details
const supabaseUrl = 'https://crmgfqgxkogqomavssjq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybWdmcWd4a29ncW9tYXZzc2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDQ4NzcsImV4cCI6MjA2NjYyMDg3N30.E5RDI19HUtM0jg-zIyT9dFdtkLOa6WpGRJ3n275Cse8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
