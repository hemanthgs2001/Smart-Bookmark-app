import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('🔧 Creating Supabase client with:', { 
    url: supabaseUrl, 
    keyExists: !!supabaseKey 
  });
  
  return createBrowserClient(supabaseUrl!, supabaseKey!)
}