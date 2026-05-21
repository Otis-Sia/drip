const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read env variables
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnvVar = (name) => {
  const match = envContent.match(new RegExp(`${name}=(.*)`));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Checking blog_posts table...');
  const { data: blogs, error: blogErr } = await supabase.from('blog_posts').select('id, title, slug');
  if (blogErr) {
    console.error('Error fetching blogs:', blogErr);
  } else {
    console.log(`Found ${blogs.length} blog posts in DB:`, blogs);
  }

  console.log('\nChecking gallery_items table...');
  const { data: gallery, error: galleryErr } = await supabase.from('gallery_items').select('id, title, type');
  if (galleryErr) {
    console.error('Error fetching gallery items:', galleryErr);
  } else {
    console.log(`Found ${gallery.length} gallery items in DB:`, gallery);
  }
}

check();
