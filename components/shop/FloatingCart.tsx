'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { usePathname } from 'next/navigation';

export default function FloatingCart() {
  const { itemCount } = useCart();
  const pathname = usePathname();

  // Only show on /delver routes
  if (!pathname?.startsWith('/delver')) return null;
  // Hide on the cart page itself to avoid redundancy
  if (pathname === '/delver/cart') return null;

  return (
    <Link
      href="/delver/cart"
      className="fixed top-[88px] right-6 z-40 group animate-fadeIn"
      id="floating-cart"
    >
      <div className="relative bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl rounded-2xl p-4 transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 group-hover:border-[#63913D]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#63913D] to-[#8FBB43] flex items-center justify-center text-white shadow-lg shadow-green-500/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          
          <div className="hidden sm:block">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Your Quote</p>
            <p className="text-sm font-bold text-gray-900 leading-none">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </p>
          </div>
        </div>

        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-red-500/40 animate-pulse">
            {itemCount}
          </span>
        )}

        {/* Hover Tip */}
        <div className="absolute top-full mt-2 right-0 bg-gray-900 text-white text-[10px] font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          View Quote Request →
        </div>
      </div>
    </Link>
  );
}
