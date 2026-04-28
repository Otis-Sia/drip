'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide mb-2">Quote Cart</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Your Quote Request</h1>
          <p className="text-blue-100">{itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} ready for quote` : 'Your quote cart is empty'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your quote cart is empty</h2>
            <p className="text-gray-600 mb-8">Browse our products and add items to request a quote.</p>
            <Link href="/shop" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Items for Quote</h2>
                <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-medium">
                  Clear All
                </button>
              </div>
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-2">{item.category}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-medium">−</button>
                      <span className="px-4 py-1.5 text-gray-900 font-medium min-w-[2.5rem] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-medium">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-20">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Quote Summary</h3>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700 flex-1">{item.name}</span>
                      <span className="text-gray-500 ml-2">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total Items</span>
                    <span className="text-blue-800">{itemCount}</span>
                  </div>
                </div>
                <Link href="/shop/checkout" className="block bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center mb-3">
                  Proceed to Request Quote
                </Link>
                <Link href="/shop" className="block text-center text-blue-700 hover:text-blue-600 text-sm font-medium">
                  ← Continue Browsing
                </Link>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-xs text-center">Our team will review your request and provide a detailed proposal within 1 business day.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
