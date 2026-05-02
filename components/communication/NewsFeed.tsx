'use client';

import { useState } from 'react';
import Image from 'next/image';
import { NewsItem } from '@/lib/communication';

interface NewsFeedProps {
  news: NewsItem[];
  hideTitle?: boolean;
}

export default function NewsFeed({ news, hideTitle = false }: NewsFeedProps) {
  const [filter, setFilter] = useState<'All' | 'General' | 'Clients'>('All');

  const filteredNews = filter === 'All' ? news : news.filter((item) => item.category === filter);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {!hideTitle ? (
          <div className="flex items-center gap-2">
            <Image src="/newspaper.svg" alt="" width={22} height={22} />
            <h2 className="text-xl font-bold text-gray-900">Latest Messages</h2>
          </div>
        ) : (
          <div /> // Spacer to keep filters on the right
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1 rounded-xl w-fit">
          {(['All', 'General', 'Clients'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                filter === cat
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="card overflow-hidden hover:border-[#63913D]/30 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row">
              {/* News Image */}
              {item.image && (
                <div className="relative w-full sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
                </div>
              )}
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <span
                    className={`badge-tag !text-[10px] !px-2 !py-0.5 ${
                      item.category === 'Clients'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
