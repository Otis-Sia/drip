'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-cyan-500 text-white font-black text-xl px-3 py-1 rounded-md">DRIP</div>
            <div className="hidden sm:block">
              <div className="text-white font-semibold text-sm leading-tight">Digital Resources &amp;</div>
              <div className="text-cyan-300 text-xs">Informatics Professionals</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link key={link.href} href={link.href} className="text-gray-200 hover:text-cyan-300 transition-colors text-sm font-medium">
                {link.label}
              </Link>
            ))}
            <Link href="/shop/cart" className="relative bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
              Quote Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-md text-gray-200 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      {menuOpen && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-2">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-cyan-300 text-sm font-medium">
              {link.label}
            </Link>
          ))}
          <Link href="/shop/cart" onClick={() => setMenuOpen(false)} className="block py-2 text-cyan-300 font-medium text-sm">
            Quote Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
        </div>
      )}
    </nav>
  );
}
