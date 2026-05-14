'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/communication', label: 'Communication' },
    { href: '#main-footer', label: 'Contact' },
  ];

  const currentLabel = links.find(link => 
    link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href)
  )?.label || '';


  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-surface/90 backdrop-blur-xl border-b border-border/50 ${
        scrolled
          ? 'shadow-lg'
          : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10" id="logo-link">
            <Image 
              src="/afrodrip.svg" 
              alt="Afrodrip Logo" 
              width={160} 
              height={50} 
              className="h-10 w-auto transition-all duration-300"
              priority
            />
          </Link>

          {/* Mobile Current Page Label & Cart */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
              {currentLabel}
            </span>


          </div>


          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted hover:text-fg hover:bg-surface-alt/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}


          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            id="mobile-menu-toggle"
            className="md:hidden p-2.5 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100 relative z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 pb-5 pt-2 space-y-1 shadow-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}


        </div>
      </div>
    </nav>
  );
}
