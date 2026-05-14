'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SubNavbar() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'services-section', 'products-section'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition <= bottom) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'services-section', label: 'Services', href: '#services-section' },
    { id: 'products-section', label: 'Products', href: '#products-section' },
  ];

  return (
    <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 overflow-x-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-8 h-12 whitespace-nowrap">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-3 ${
                activeSection === link.id
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
