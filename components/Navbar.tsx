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
  const isShopPage = pathname?.startsWith('/shop');

  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/communication', label: 'Communication' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
  ];

  const currentLabel = links.find(link => 
    link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href)
  )?.label || '';


  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(15,23,42,0.08)] border-b border-gray-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center" id="logo-link">
            <Image 
              src="/afrodrip.svg" 
              alt="Afrodrip Logo" 
              width={160} 
              height={50} 
              className={`h-10 w-auto transition-all duration-300 ${!scrolled && 'brightness-0 invert'}`}
              priority
            />
          </Link>

          {/* Mobile Current Page Label & Cart */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              {currentLabel}
            </span>
            {isShopPage && (
              <Link
                href="/shop/cart"
                id="mobile-nav-cart"
                className={`relative p-1.5 transition-all duration-300 rounded-full ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-lg shadow-red-500/30 animate-scaleIn">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
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
                      ? scrolled ? 'text-[#63913D]' : 'text-white'
                      : scrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <div className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full transition-colors duration-300 ${
                      scrolled ? 'bg-[#63913D]' : 'bg-white'
                    }`} />
                  )}
                </Link>
              );
            })}
            {isShopPage && (
              <Link
                href="/shop/cart"
                id="nav-quote-cart"
                className="relative ml-2 btn-primary !py-2 !px-4 !text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Cart
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg shadow-red-500/30 animate-scaleIn">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            id="mobile-menu-toggle"
            className={`md:hidden p-2.5 rounded-lg transition-all duration-300 ${
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
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
          {isShopPage && (
            <Link
              href="/shop/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 px-4 text-[#63913D] font-semibold text-sm"
            >
              <Image src="/clipboard.svg" alt="" width={16} height={16} />
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
