'use client';

import Link from 'next/link';
import { alerts, news, events, resources } from '@/lib/communication';
import CommunicationFeed from '@/components/communication/CommunicationFeed';
import Calendar from '@/components/communication/Calendar';
import QuickResources from '@/components/communication/QuickResources';

export default function CommunicationPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20 mx-auto">
            Bulletin &amp; Updates
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">
            Communication Hub
          </h1>
          <p className="text-green-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            Stay informed with the latest announcements, urgent alerts, and scheduled events for the Afrodrip community.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left/Middle Column: Unified Feed */}
          <div className="lg:col-span-2">
            <CommunicationFeed alerts={alerts} news={news} />
          </div>

          {/* Right Column: Calendar & Resources (Sticky) */}
          <div className="space-y-12 lg:sticky lg:top-24 h-fit">
            <Calendar events={events} />
            <QuickResources resources={resources} />
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
            If you are a verified client looking to post an announcement, please contact our administrator.
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
