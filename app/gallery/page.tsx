'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGalleryItems, GalleryItem } from '@/lib/gallery';

function getYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
  return match ? match[1] : null;
}

function getEmbedUrl(url: string): string {
  const ytId = getYoutubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1`;

  const vimeoId = getVimeoId(url);
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;

  return url;
}

function getVideoThumbnail(url: string): string {
  const ytId = getYoutubeId(url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  
  // High quality agricultural placeholder for Vimeo/Other
  return "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800";
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const galleryData = await getGalleryItems();
      setItems(galleryData);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (lightboxIndex === null) return;
    let nextIdx = direction === 'next' ? lightboxIndex + 1 : lightboxIndex - 1;
    if (nextIdx >= filteredItems.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = filteredItems.length - 1;
    setLightboxIndex(nextIdx);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24">
      {/* Hero section */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20 mx-auto">
            Visual Showcases
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">
            Project Gallery
          </h1>
          <p className="text-green-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            Take a look at our state-of-the-art greenhouse systems, precision irrigation networks, and climate-smart farm sites across East Africa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters */}
        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
          {(['all', 'image', 'video'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                filter === type
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.03]'
                  : 'bg-white text-muted hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {type === 'all' ? 'All Media' : type === 'image' ? 'Photos' : 'Videos'}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-sm text-muted font-medium">Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 text-gray-500 font-medium">
            No gallery items found.
          </div>
        ) : (
          /* Masonry Grid */
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, idx) => {
              const isYoutubeOrVimeo = item.type === 'video' && (getYoutubeId(item.url) || getVimeoId(item.url));
              const displayUrl = item.type === 'image' ? item.url : (isYoutubeOrVimeo ? getVideoThumbnail(item.url) : item.url);
              const aspect = item.type === 'video' ? '16/9' : 'auto';

              return (
                <div
                  key={item.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-150 transition-all duration-500 group cursor-pointer bg-white w-full"
                  style={{ aspectRatio: aspect }}
                >
                  {/* Media Content */}
                  {item.type === 'image' || isYoutubeOrVimeo ? (
                    <img
                      src={displayUrl}
                      alt={item.title || ''}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={item.url}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        preload="metadata"
                        muted
                        playsInline
                      />
                    </div>
                  )}

                  {/* Glassy Video Badge or Play Icon */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/40 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <svg className="w-6 h-6 text-white ml-0.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-base leading-snug transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title || 'Afrodrip Installation'}
                    </h3>
                    {item.caption && (
                      <p className="text-gray-200/90 text-xs mt-1.5 line-clamp-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-md transition-all duration-300 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Lightbox Media Wrapper */}
          <div className="max-w-5xl w-full px-6 flex flex-col items-center justify-center" onClick={() => setLightboxIndex(null)}>
            <div 
              className="relative bg-black rounded-3xl overflow-hidden shadow-2xl max-h-[75vh] w-full flex items-center justify-center border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {activeItem.type === 'image' ? (
                <img
                  src={activeItem.url}
                  alt={activeItem.title || ''}
                  className="max-h-[75vh] max-w-full object-contain mx-auto"
                />
              ) : (
                (() => {
                  const isYtOrVim = getYoutubeId(activeItem.url) || getVimeoId(activeItem.url);
                  if (isYtOrVim) {
                    return (
                      <div className="w-full aspect-video">
                        <iframe
                          src={getEmbedUrl(activeItem.url)}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    );
                  }
                  return (
                    <video
                      src={activeItem.url}
                      className="max-h-[75vh] max-w-full"
                      controls
                      autoPlay
                    />
                  );
                })()
              )}
            </div>

            {/* Media Information */}
            <div className="text-center mt-6 max-w-2xl text-white px-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold">{activeItem.title || 'Project Showcase'}</h2>
              {activeItem.caption && <p className="text-sm text-gray-300/90 mt-2 leading-relaxed">{activeItem.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
