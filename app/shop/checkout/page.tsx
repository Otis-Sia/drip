'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, itemCount, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/shop" className="text-blue-700 hover:underline">Browse products</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl p-10 shadow-sm border border-gray-200">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Quote Request Submitted!</h2>
          <p className="text-gray-600 mb-8">Thank you, {form.name}. Our team will review your request and send a detailed proposal to <strong>{form.email}</strong> within 1 business day.</p>
          <div className="space-y-3">
            <Link href="/" className="block bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Back to Home
            </Link>
            <Link href="/shop" className="block border border-blue-700 text-blue-700 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors">
              Browse More Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide mb-2">Request for Quotation</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Complete Your Quote Request</h1>
          <p className="text-blue-100">Fill in your details and we&apos;ll prepare a customized proposal for you.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="Juan dela Cruz"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="juan@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="+63 912 345 6789"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organization <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Company, Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe your specific requirements, timeline, or any questions..."
                  />
                </div>
                <button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Submit Quote Request
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Quote Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <span className="text-sm text-gray-600">× {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-700">Total Items</span>
                  <span className="text-blue-800">{itemCount}</span>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 rounded-xl p-4">
                <p className="text-blue-800 text-xs font-medium mb-1">What happens next?</p>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>✓ We review your request</li>
                  <li>✓ Prepare a customized proposal</li>
                  <li>✓ Send to your email within 24 hours</li>
                  <li>✓ Schedule a consultation call</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
