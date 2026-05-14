import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (process.env.NODE_ENV === 'production') {
    console.error('CRITICAL: Supabase environment variables are missing in production!');
  } else {
    console.warn('Supabase credentials missing. Please check your .env.local file.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
