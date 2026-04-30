'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Alert {
  id: number;
  title: string;
  content: string;
  severity: 'info' | 'warning' | 'error';
  date: string;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: 'General' | 'Clients' | 'Staff';
  date: string;
}

interface EventItem {
  date: string;
  title: string;
  type: string;
}

interface ResourceItem {
  title: string;
  link: string;
  icon: string;
  target: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    title: 'Scheduled System Maintenance',
    content: 'The client portal will be offline on Saturday, May 2nd, from 10:00 PM to 2:00 AM for critical infrastructure upgrades.',
    severity: 'info',
    date: 'April 29, 2026',
  },
  {
    id: 2,
    title: 'Weather Advisory: Heavy Rainfall Expected',
    content: 'Please ensure your greenhouse drainage systems are clear. Heavy rainfall is predicted across the Rift Valley region over the next 48 hours.',
    severity: 'warning',
    date: 'April 28, 2026',
  },
];

const news: NewsItem[] = [
  {
    id: 1,
    title: 'New Climate-Smart Farming Modules Launched',
    content: 'We have added three new consultation modules focusing on water conservation and organic crop protection.',
    category: 'General',
    date: 'April 25, 2026',
  },
  {
    id: 2,
    title: 'Upcoming Agricultural Workshop in Nakuru',
    content: 'Join our agronomists on May 15th for a hands-on workshop on optimizing drip irrigation efficiency.',
    category: 'Clients',
    date: 'April 22, 2026',
  },
  {
    id: 3,
    title: 'Internal Policy Update: Field Guidelines',
    content: 'The updated Work-From-Home and Field Hybrid guidelines for Q2 2026 have been published in the internal HR portal.',
    category: 'Staff',
    date: 'April 20, 2026',
  },
  {
    id: 4,
    title: 'Welcome Our New Field Agronomists',
    content: 'Please join us in welcoming our three new field agronomists joining our Nairobi and Nakuru branches.',
    category: 'Staff',
    date: 'April 18, 2026',
  },
  {
    id: 5,
    title: 'Q1 Agricultural Yield Report Released',
    content: 'Our comprehensive analysis of climate-smart farming trends and crop yields for Q1 2026 is now available.',
    category: 'Clients',
    date: 'April 15, 2026',
  },
];

const events: EventItem[] = [
  { date: 'May 05', title: 'Webinar: Optimizing Greenhouse Yields', type: 'Client Event' },
  { date: 'May 12', title: 'Internal Tech Talk: Drip Irrigation Techniques', type: 'Staff Training' },
  { date: 'May 18', title: 'Monthly System Maintenance Window', type: 'Maintenance' },
  { date: 'May 25', title: 'Town Hall Meeting', type: 'Company Wide' },
];

const resources: ResourceItem[] = [
  { title: 'Client Portal', link: '/shop', icon: '/lock.svg', target: 'Clients' },
  { title: 'Knowledge Base', link: '/services', icon: '/knowledge_base.svg', target: 'General' },
  { title: 'Submit a Ticket', link: '/contact', icon: '/ticket.svg', target: 'Clients' },
  { title: 'Internal HR Portal', link: '#', icon: '/hr_portal.svg', target: 'Staff' },
];

export default function CommunicationsPage() {
  const [filter, setFilter] = useState<'All' | 'General' | 'Clients' | 'Staff'>('All');

  const filteredNews = filter === 'All' ? news : news.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-6 backdrop-blur-sm mx-auto">
            Bulletin &amp; Updates
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">
            Communications Hub
          </h1>
          <p className="text-green-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            Stay informed with the latest announcements, urgent alerts, and scheduled events for DRIP clients and team members.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left/Middle Column: Alerts & News */}
          <div className="lg:col-span-2 space-y-12">
            {/* Alerts Section */}
            {alerts.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/bell.svg" alt="" width={22} height={22} />
                  <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
                </div>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`glass-card p-6 border-l-4 rounded-r-2xl animate-fadeInUp ${
                        alert.severity === 'warning'
                          ? 'border-l-amber-500 bg-amber-500/5'
                          : alert.severity === 'error'
                          ? 'border-l-red-500 bg-red-500/5'
                          : 'border-l-[#63913D] bg-[#63913D]/5'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span
                            className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              alert.severity === 'warning'
                                ? 'bg-amber-100 text-amber-800'
                                : alert.severity === 'error'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-[#63913D]/10 text-[#63913D]'
                            }`}
                          >
                            {alert.severity}
                          </span>
                          <h3 className="font-bold text-gray-900 mt-2 text-base">
                            {alert.title}
                          </h3>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          {alert.date}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                        {alert.content}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* News Feed Section */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Image src="/newspaper.svg" alt="" width={22} height={22} />
                  <h2 className="text-xl font-bold text-gray-900">Latest Messages</h2>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1 rounded-xl w-fit">
                  {(['All', 'General', 'Clients', 'Staff'] as const).map((cat) => (
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
                    className="card p-6 hover:border-[#63913D]/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <span
                        className={`badge-tag !text-[10px] !px-2 !py-0.5 ${
                          item.category === 'Clients'
                            ? 'bg-blue-50 text-blue-700'
                            : item.category === 'Staff'
                            ? 'bg-purple-50 text-purple-700'
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
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Calendar & Resources */}
          <div className="space-y-12">
            {/* Calendar Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/calendar.svg" alt="" width={22} height={22} />
                <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
              </div>
              <div className="card p-6">
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-gradient-to-br from-[#63913D] to-[#8FBB43] text-white font-bold text-center py-2 px-3 rounded-xl min-w-[60px]">
                        <span className="block text-xs uppercase tracking-wider leading-none">
                          {event.date.split(' ')[0]}
                        </span>
                        <span className="block text-lg leading-tight mt-0.5">
                          {event.date.split(' ')[1]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm leading-snug">
                          {event.title}
                        </h4>
                        <span className="text-[11px] font-medium text-[#63913D] uppercase tracking-wider">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Resources */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/chain_link.svg" alt="" width={22} height={22} />
                <h2 className="text-xl font-bold text-gray-900">Quick Resources</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {resources.map((res, index) => (
                  <Link
                    key={index}
                    href={res.link}
                    className="card p-5 text-center flex flex-col items-center group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Image src={res.icon} alt="" width={28} height={28} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-xs mb-1">
                      {res.title}
                    </h4>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                      For {res.target}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="gradient-cta text-white py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
            Need to Broadcast a Message?
          </h2>
          <p className="text-green-200/70 mb-8 max-w-xl mx-auto text-sm font-light">
            If you are a staff member or verified client looking to post an announcement, please contact the communications administrator.
          </p>
          <Link
            href="/contact"
            className="btn-primary !px-8 !py-3 !text-sm"
            id="comms-cta-contact"
          >
            Contact Admin
          </Link>
        </div>
      </section>
    </div>
  );
}
