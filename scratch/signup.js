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

async function signup() {
  console.log('Attempting to create/sign up admin user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@afrodrip.co.ke',
    password: 'password123',
  });

  if (error) {
    console.error('Error during signup:', error.message);
  } else {
    console.log('Signup response data:', data);
  }
}

signup();
