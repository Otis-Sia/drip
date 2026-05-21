'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPosts, BlogPost } from '@/lib/blog';

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text ? text.split(/\s+/).length : 0;
  return Math.ceil(words / wordsPerMinute) || 1;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Extract all tags from posts
  const allTags = Array.from(
    new Set(
      posts.reduce<string[]>((acc, post) => {
        // Mock tags or categories based on keywords if not explicit
        const keywords = ['Irrigation', 'Greenhouse', 'Agronomy', 'Farming'];
        const matches = keywords.filter(kw => 
          post.title.toLowerCase().includes(kw.toLowerCase()) || 
          post.excerpt.toLowerCase().includes(kw.toLowerCase())
        );
        return [...acc, ...(matches.length > 0 ? matches : ['General'])];
      }, [])
    )
  );

  const getPostTag = (post: BlogPost): string => {
    const keywords = ['Irrigation', 'Greenhouse', 'Agronomy', 'Farming'];
    const match = keywords.find(kw => 
      post.title.toLowerCase().includes(kw.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(kw.toLowerCase())
    );
    return match || 'General';
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase());
    
    if (selectedTag) {
      const postTag = getPostTag(post);
      return matchesSearch && postTag === selectedTag;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24">
      {/* Hero section */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20 mx-auto">
            Insights &amp; Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">
            The Afrodrip Blog
          </h1>
          <p className="text-green-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            Expert farming guides, agronomist advice, greenhouse designs, and stories from successful growers across Kenya.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16">
          {/* Tags */}
          <div className="flex gap-2 flex-wrap items-center justify-center md:justify-start w-full md:w-auto">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                selectedTag === null
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-muted hover:bg-gray-150 border border-gray-200'
              }`}
            >
              All Topics
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  selectedTag === tag
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white text-muted hover:bg-gray-150 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 pl-11 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all shadow-sm"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-sm text-muted font-medium">Loading articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 text-gray-500 bg-white border border-gray-200 rounded-3xl p-8">
            No articles found matching your criteria. Try adjusting your filters.
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const tag = getPostTag(post);
              const readTime = calculateReadingTime(post.content);

              return (
                <article 
                  key={post.id || index} 
                  className="card group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Banner Image */}
                  <Link href={`/blog/${post.slug}`} className="relative h-56 w-full block overflow-hidden bg-gray-100">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-white px-3.5 py-1.5 rounded-full shadow-lg border border-primary-light/10">
                        {tag}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted mb-4 font-semibold uppercase tracking-wider">
                      <span>{new Date(post.published_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span>{readTime} min read</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs uppercase border border-primary/20">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-gray-700 truncate max-w-[150px]">
                          {post.author}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-primary-dark transition-colors flex items-center gap-1.5 shrink-0">
                        Read More
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
