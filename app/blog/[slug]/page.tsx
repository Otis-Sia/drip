import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Afrodrip Limited',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Afrodrip Limited`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author],
      images: [
        {
          url: post.image || '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image || '/og-image.png'],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch all posts for recommended articles
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 2);

  const words = post.content ? post.content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(words / 200) || 1;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24">
      {/* Article Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1B2D11] overflow-hidden text-white">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
          <div className="absolute -bottom-[10%] right-[10%] w-[35%] h-[35%] rounded-full bg-primary-light blur-[110px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-300 hover:text-white transition-colors mb-8 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>

          {/* Meta Tags */}
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-green-300 mb-4">
            <span>{new Date(post.published_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-700" />
            <span>{readingTime} Min Read</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-[1.15] text-white">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary-light text-sm uppercase border border-primary-light/20">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">{post.author}</div>
              <div className="text-[10px] text-green-300/70 font-semibold uppercase tracking-widest mt-1">Published Author</div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <article className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-xl p-6 sm:p-10 md:p-14">
          {/* Featured Image */}
          {post.image && (
            <div className="rounded-2xl overflow-hidden mb-10 shadow-md aspect-video relative bg-gray-100 border border-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Text Content */}
          <div 
            className="prose prose-green prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost, idx) => (
                <div key={relatedPost.id || idx} className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all p-6 flex flex-col group">
                  <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">
                    {new Date(relatedPost.published_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <Link href={`/blog/${relatedPost.slug}`} className="mt-auto text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                    Read Post
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
