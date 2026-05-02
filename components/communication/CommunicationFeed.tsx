'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Alert, NewsItem } from '@/lib/communication';

interface CommunicationFeedProps {
  alerts: Alert[];
  news: NewsItem[];
}

type FeedItem = 
  | (Alert & { type: 'alert' })
  | (NewsItem & { type: 'news' });

export default function CommunicationFeed({ alerts, news }: CommunicationFeedProps) {
  const [filter, setFilter] = useState<'All' | 'General' | 'Clients'>('All');

  // Filter news items
  const filteredNews = filter === 'All' ? news : news.filter(n => n.category === filter);

  // Merge and sort: Alerts first, then by date (descending)
  const combinedFeed: FeedItem[] = [
    ...alerts.map(a => ({ ...a, type: 'alert' as const })),
    ...filteredNews.map(n => ({ ...n, type: 'news' as const })),
  ].sort((a, b) => {
    // Primary sort: Alerts always come first
    if (a.type === 'alert' && b.type !== 'alert') return -1;
    if (a.type !== 'alert' && b.type === 'alert') return 1;
    
    // Secondary sort: Date (descending)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (combinedFeed.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 font-medium">No updates at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#63913D]/10 flex items-center justify-center">
            <Image src="/bell.svg" alt="" width={24} height={24} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Alerts & Updates</h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1.5 rounded-2xl w-fit shadow-inner">
          {(['All', 'General', 'Clients'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-bold px-5 py-2 rounded-xl transition-all duration-300 ${
                filter === cat
                  ? 'bg-white text-[#63913D] shadow-md scale-[1.02]'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {combinedFeed.map((item, index) => {
          if (item.type === 'alert') {
            return (
              <div
                key={`alert-${item.id}`}
                className={`glass-card p-6 border-l-4 rounded-r-2xl animate-fadeInUp ${
                  item.severity === 'warning'
                    ? 'border-l-amber-500 bg-amber-500/5'
                    : item.severity === 'error'
                    ? 'border-l-red-500 bg-red-500/5'
                    : 'border-l-[#63913D] bg-[#63913D]/5'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                        item.severity === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : item.severity === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-[#63913D]/10 text-[#63913D]'
                      }`}>
                        Urgent: {item.severity}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {item.content}
                </p>
              </div>
            );
          } else {
            return (
              <div
                key={`news-${item.id}`}
                className="card overflow-hidden hover:border-[#63913D]/30 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {item.image && (
                    <div className="relative w-full sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-blue-400" />
                         <span className="badge-tag !text-[10px] !px-2 !py-0.5 bg-blue-50 text-blue-700">
                           Message: {item.category}
                         </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
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
            );
          }
        })}
      </div>
    </div>
  );
}
