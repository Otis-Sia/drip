'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import { branches } from '@/lib/branches';

export default function CheckoutPage() {
  const { items, itemCount, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    pickupLocation: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
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
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center pt-20">
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center text-4xl mx-auto mb-6">
            📋
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add products before requesting a quote.</p>
          <Link href="/shop" className="btn-secondary">Browse products</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center card p-12 !rounded-3xl animate-scaleIn">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#63913D] to-[#8FBB43] flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-green-500/20">
            ✓
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Quote Request Submitted!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you, <strong>{form.name}</strong>. Our team will review your request and send a detailed proposal to <strong>{form.email}</strong> within 1 business day.
            Your selected pickup location is <strong>{branches.find(b => b.id === form.pickupLocation)?.name || form.pickupLocation}</strong>.
          </p>
          <div className="space-y-3">
            <Link href="/" className="btn-secondary block" id="checkout-back-home">
              Back to Home
            </Link>
            <Link href="/shop" className="btn-outline-dark block" id="checkout-browse-more">
              Browse More Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="gradient-hero text-white pt-32 pb-14 md:pt-40 md:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-4 backdrop-blur-sm">Request for Quotation</div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Complete Your Quote Request</h1>
          <p className="text-green-100/70 font-light">Fill in your details and we&apos;ll prepare a customized proposal for you.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card p-8 !rounded-2xl animate-fadeInUp">
              <h2 className="text-xl font-bold text-gray-900 mb-7">Contact Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`input-field ${errors.name ? 'error' : ''}`}
                    placeholder="Juan dela Cruz"
                    id="checkout-name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`input-field ${errors.email ? 'error' : ''}`}
                    placeholder="juan@company.com"
                    id="checkout-email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`input-field ${errors.phone ? 'error' : ''}`}
                    placeholder="+63 912 345 6789"
                    id="checkout-phone"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company / Organization <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="input-field"
                    placeholder="Your Company, Inc."
                    id="checkout-company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.pickupLocation}
                    onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                    className={`input-field ${errors.pickupLocation ? 'error' : ''}`}
                    id="checkout-pickup"
                  >
                    <option value="">Select a pickup location</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name} – {branch.address}
                      </option>
                    ))}
                  </select>
                  {errors.pickupLocation && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.pickupLocation}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message / Requirements <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Describe your specific requirements, timeline, or any questions..."
                    id="checkout-message"
                  />
                </div>
                <button type="submit" className="btn-primary w-full !py-3.5 !rounded-xl text-base" id="checkout-submit">
                  Submit Quote Request
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="card p-7 sticky top-24 !rounded-2xl animate-slideRight">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Quote Summary</h3>
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                      {(item.farmSize || item.location) && (
                        <p className="text-[10px] text-gray-500 mt-1">
                          {item.farmSize && `Size: ${item.farmSize}`}
                          {item.farmSize && item.location && ' | '}
                          {item.location && `Loc: ${item.location}`}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 font-medium flex-shrink-0">× {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-5">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700">Total Items</span>
                  <span className="text-[#63913D] text-lg">{itemCount}</span>
                </div>
              </div>
              <div className="mt-6 bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 rounded-2xl p-5">
                <p className="text-[#63913D] text-xs font-bold mb-2 uppercase tracking-wider">What happens next?</p>
                <ul className="space-y-2">
                  {[
                    'We review your request',
                    'Prepare a customized proposal',
                    'Send to your email within 24 hours',
                    'Schedule a consultation call',
                  ].map((step) => (
                    <li key={step} className="text-[#63913D]/80 text-xs flex items-start gap-2 font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#63913D]/10 text-[#63913D] flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">✓</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
