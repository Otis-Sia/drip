'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="gradient-hero text-white pt-32 pb-14 md:pt-40 md:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-4 backdrop-blur-sm">Cart</div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Your Quote Request</h1>
          <p className="text-green-100/70 font-light">
            {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} ready for quote` : 'Your cart is empty'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center mx-auto mb-6">
              <Image src="/clipboard.svg" alt="" width={40} height={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Browse our products and add items to request a quote.</p>
            <Link href="/shop" className="btn-secondary" id="cart-browse-link">
              Browse Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Items for Quote</h2>
                <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-semibold transition-colors" id="cart-clear-all">
                  Clear All
                </button>
              </div>
              {items.map((item) => (
                <div key={item.cartItemId} className="card !rounded-2xl p-6 flex flex-col sm:flex-row gap-5 animate-fadeIn">
                  <div className="flex-1">
                    <div className="badge mb-2">{item.category}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.description}</p>
                    
                    {item.customNotes && (
                      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 space-y-1">
                        <p><span className="font-semibold text-gray-900">Notes:</span> {item.customNotes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-3.5 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-gray-900 font-semibold min-w-[2.5rem] text-center text-sm border-x border-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-3.5 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-red-400 hover:text-red-500 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="card p-7 sticky top-24 !rounded-2xl">
                <h3 className="font-bold text-gray-900 text-lg mb-5">Quote Summary</h3>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between text-sm">
                      <span className="text-gray-600 flex-1 font-medium">{item.name}</span>
                      <span className="text-gray-400 ml-2">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-900">Total Items</span>
                    <span className="text-[#63913D] text-lg">{itemCount}</span>
                  </div>
                </div>
                <Link href="/shop/checkout" className="btn-primary block text-center mb-3 !rounded-xl !py-3.5" id="cart-proceed-checkout">
                  Proceed to Request Quote
                </Link>
                <Link href="/shop" className="block text-center text-[#63913D] hover:text-[#8FBB43] text-sm font-semibold transition-colors">
                  ← Continue Browsing
                </Link>
                <div className="mt-7 pt-5 border-t border-gray-100">
                  <p className="text-gray-400 text-xs text-center leading-relaxed">Our team will review your request and provide a detailed proposal within 1 business day.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
