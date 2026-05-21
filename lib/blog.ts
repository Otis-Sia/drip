import { supabase } from './supabase';
import fallbackBlogPosts from './data/blog.json';

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  published_at: string;
  created_at?: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase blog_posts empty or failed. Falling back to local data.', error?.message);
      return fallbackBlogPosts as BlogPost[];
    }

    return data as BlogPost[];
  } catch (err) {
    console.error('Error fetching blog posts from Supabase. Falling back.', err);
    return fallbackBlogPosts as BlogPost[];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      console.warn(`Supabase blog_post by slug "${slug}" not found or failed. Searching locally.`, error?.message);
      const local = (fallbackBlogPosts as BlogPost[]).find(p => p.slug === slug);
      return local || null;
    }

    return data as BlogPost;
  } catch (err) {
    console.error(`Error fetching blog post "${slug}" from Supabase. Searching locally.`, err);
    const local = (fallbackBlogPosts as BlogPost[]).find(p => p.slug === slug);
    return local || null;
  }
}
