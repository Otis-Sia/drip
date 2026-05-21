const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnvVar = (name) => {
  const match = envContent.match(new RegExp(`${name}=(.*)`));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

const supabase = createClient(supabaseUrl, supabaseKey);

async function signin() {
  console.log('Attempting to sign in admin user...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@afrodrip.co.ke',
    password: 'password123',
  });

  if (error) {
    console.error('Error during signin:', error.message);
  } else {
    console.log('Signin successful! Session token:', data.session ? 'Present' : 'Missing');
  }
}

signin();
