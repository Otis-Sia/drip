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
  console.error('Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateImages() {
  console.log('Updating blog posts image URLs...');
  const { error: blogErr1 } = await supabase
    .from('blog_posts')
    .update({ image: '/smart_greenhouse.png' })
    .eq('slug', 'designing-perfect-greenhouse-east-africa');

  const { error: blogErr2 } = await supabase
    .from('blog_posts')
    .update({ image: '/avocado_sprinklers.png' })
    .eq('slug', 'maximizing-yield-drip-irrigation-guide');

  if (blogErr1 || blogErr2) {
    console.error('Error updating blog post images:', blogErr1 || blogErr2);
  } else {
    console.log('Blog post images updated successfully!');
  }

  console.log('Updating gallery items image URLs...');
  
  // Greenhouse
  const { error: galErr1 } = await supabase
    .from('gallery_items')
    .update({ url: '/smart_greenhouse.png' })
    .eq('id', 'e1a1a1a1-1111-1111-1111-111111111111');

  // Avocado Sprinklers
  const { error: galErr2 } = await supabase
    .from('gallery_items')
    .update({ url: '/avocado_sprinklers.png' })
    .eq('id', 'e3c3c3c3-3333-3333-3333-333333333333');

  // Tomato Harvest
  const { error: galErr3 } = await supabase
    .from('gallery_items')
    .update({ url: '/tomato_harvest.png' })
    .eq('id', 'e5e5e5e5-5555-5555-5555-555555555555');

  if (galErr1 || galErr2 || galErr3) {
    console.error('Error updating gallery items:', galErr1 || galErr2 || galErr3);
  } else {
    console.log('Gallery items updated successfully!');
  }
}

updateImages();
