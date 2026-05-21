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

async function populate() {
  console.log('Loading local JSON data...');
  const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'lib', 'data', 'blog.json'), 'utf8'));
  const galleryData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'lib', 'data', 'gallery.json'), 'utf8'));

  console.log(`Loaded ${blogData.length} blog posts and ${galleryData.length} gallery items.`);

  console.log('Inserting blog posts into Supabase...');
  const { data: insertedBlogs, error: blogErr } = await supabase
    .from('blog_posts')
    .upsert(blogData.map(post => {
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        image: post.image,
        author: post.author,
        published_at: post.published_at,
        created_at: post.created_at
      };
    }));

  if (blogErr) {
    console.error('Error inserting blogs:', blogErr);
  } else {
    console.log('Blog posts inserted successfully!');
  }

  console.log('Inserting gallery items into Supabase...');
  const { data: insertedGallery, error: galleryErr } = await supabase
    .from('gallery_items')
    .upsert(galleryData.map(item => {
      // Fix invalid UUID format ('g' is not hex, let's replace 'g' with 'e')
      const fixedId = item.id.replace(/^g/, 'e');
      return {
        id: fixedId,
        title: item.title,
        type: item.type,
        url: item.url,
        width: item.width,
        height: item.height,
        caption: item.caption,
        created_at: item.created_at
      };
    }));

  if (galleryErr) {
    console.error('Error inserting gallery items:', galleryErr);
  } else {
    console.log('Gallery items inserted successfully!');
  }
}

populate();
