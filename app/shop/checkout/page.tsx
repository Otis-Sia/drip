'use client';

import { useState, useRef } from 'react';
import { useForm as useFormspree } from '@formspree/react';
import { useCart, CartItem } from '@/lib/cartContext';
import Link from 'next/link';
import Image from 'next/image';
import { branches } from '@/lib/branches';

export default function CheckoutPage() {
  const { items, itemCount, clearCart } = useCart();
  const [isReviewing, setIsReviewing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    farmSize: '',
    location: '',
    pickupLocation: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Formspree hook
  const [formspreeState, formspreeSubmit] = useFormspree('xkoywdkd');

  // Snapshot items before cart is cleared so success page can still reference them
  const submittedItemsRef = useRef<CartItem[]>([]);
  const submittedItemCountRef = useRef<number>(0);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.farmSize.trim()) newErrors.farmSize = 'Farm size is required';
    if (!form.location.trim()) newErrors.location = 'Farm location is required';
    if (!form.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
    return newErrors;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsReviewing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Build email-friendly summary from given items
  const buildEmailSummary = (cartItems: CartItem[], cartItemCount: number) => {
    const pickup = branches.find(b => b.id === form.pickupLocation);
    const pickupName = pickup ? `${pickup.name} – ${pickup.address}` : form.pickupLocation;

    const itemLines = cartItems.map((item, i) => {
      let line = `${i + 1}. ${item.name}\n   Category: ${item.category}\n   Quantity: ${item.quantity}`;
      if (item.customNotes) {
        line += `\n   Notes: ${item.customNotes}`;
      }
      return line;
    }).join('\n\n');

    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AFRODRIP – QUOTE REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION
──────────────────
Name:    ${form.name}
Email:   ${form.email}
Phone:   ${form.phone}
Company: ${form.company || 'N/A'}

PROJECT DETAILS
──────────────────
Farm Size: ${form.farmSize}
Location:  ${form.location}
Pickup:    ${pickupName}

ADDITIONAL REQUIREMENTS
──────────────────
${form.message || 'None specified.'}

ITEMS REQUESTED (${cartItemCount} total)
──────────────────
${itemLines}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();
  };

  const handleFinalSubmit = async () => {
    // Snapshot items before clearing
    submittedItemsRef.current = [...items];
    submittedItemCountRef.current = itemCount;

    const pickup = branches.find(b => b.id === form.pickupLocation);
    const pickupName = pickup ? `${pickup.name} – ${pickup.address}` : form.pickupLocation;

    // Submit to Formspree with all structured data
    await formspreeSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company || 'N/A',
      farmSize: form.farmSize,
      farmLocation: form.location,
      pickupLocation: pickupName,
      additionalMessage: form.message || 'None',
      totalItems: itemCount,
      message: buildEmailSummary(items, itemCount),
    });

    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Use snapshot for the success page, live items for everything else
  const displayItems = formspreeState.succeeded ? submittedItemsRef.current : items;
  const displayItemCount = formspreeState.succeeded ? submittedItemCountRef.current : itemCount;

  const [copyStatus, setCopyStatus] = useState('Copy Summary for Email');

  const handleCopy = () => {
    navigator.clipboard.writeText(buildEmailSummary(displayItems, displayItemCount));
    setCopyStatus('Copied to Clipboard!');
    setTimeout(() => setCopyStatus('Copy Summary for Email'), 3000);
  };

  // Empty cart (and not submitted)
  if (items.length === 0 && !formspreeState.succeeded) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center pt-20">
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center mx-auto mb-6">
            <Image src="/clipboard.svg" alt="" width={40} height={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add products before requesting a quote.</p>
          <Link href="/shop" className="btn-secondary">Browse products</Link>
        </div>
      </div>
    );
  }

  // Success state
  if (formspreeState.succeeded) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 pt-20">
        <div className="max-w-2xl w-full text-center space-y-8 animate-scaleIn">
          <div className="card p-12 !rounded-3xl shadow-xl">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#63913D] to-[#8FBB43] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Quote Request Submitted!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Thank you, <strong>{form.name}</strong>. Our team will review your request and send a detailed proposal to <strong>{form.email}</strong> within 1 business day.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Shareable Quote Summary</h3>
                <button 
                  onClick={handleCopy}
                  className="text-[11px] font-bold text-[#63913D] hover:text-[#8FBB43] flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm transition-all active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copyStatus}
                </button>
              </div>
              <pre className="text-[11px] text-gray-600 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-gray-50">
                {buildEmailSummary(displayItems, displayItemCount)}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/" className="btn-secondary block" id="checkout-back-home">
                Back to Home
              </Link>
              <Link href="/shop" className="btn-outline-dark block" id="checkout-browse-more">
                Browse More Products
              </Link>
            </div>
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
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-4 backdrop-blur-sm">
            {isReviewing ? 'Review Your Request' : 'Request for Quotation'}
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
            {isReviewing ? 'Confirm Your Project Details' : 'Complete Your Quote Request'}
          </h1>
          <p className="text-green-100/70 font-light">
            {isReviewing 
              ? 'Please verify all information below before final submission.' 
              : 'Fill in your details and we\'ll prepare a customized proposal for you.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="card p-8 !rounded-2xl animate-fadeInUp">
              {!isReviewing ? (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-7">Contact Information</h2>
                  <form onSubmit={handleReview} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`input-field ${errors.name ? 'error' : ''}`}
                          placeholder="Juan dela Cruz"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`input-field ${errors.email ? 'error' : ''}`}
                          placeholder="juan@company.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={`input-field ${errors.phone ? 'error' : ''}`}
                          placeholder="+63 912 345 6789"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="input-field"
                          placeholder="Your Company, Inc."
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Farm / Project Size <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={form.farmSize}
                          onChange={(e) => setForm({ ...form, farmSize: e.target.value })}
                          className={`input-field ${errors.farmSize ? 'error' : ''}`}
                          placeholder="e.g. 2 Acres, 8m x 15m"
                        />
                        {errors.farmSize && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.farmSize}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Location <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          className={`input-field ${errors.location ? 'error' : ''}`}
                          placeholder="e.g. Kitale, Trans Nzoia"
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.location}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location <span className="text-red-500">*</span></label>
                      <select
                        value={form.pickupLocation}
                        onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                        className={`input-field ${errors.pickupLocation ? 'error' : ''}`}
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message / Requirements <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Describe your specific requirements..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full !py-3.5 !rounded-xl text-base">
                      Review Quote Request
                    </button>
                  </form>
                </>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Review Your Details</h2>
                    <button 
                      onClick={() => setIsReviewing(false)}
                      className="text-sm font-semibold text-[#63913D] hover:text-[#8FBB43] flex items-center gap-1.5 transition-colors"
                      disabled={formspreeState.submitting}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Information
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    {[
                      { label: 'Full Name', value: form.name },
                      { label: 'Email Address', value: form.email },
                      { label: 'Phone Number', value: form.phone },
                      { label: 'Company', value: form.company || 'Not specified' },
                      { label: 'Farm / Project Size', value: form.farmSize },
                      { label: 'Farm Location', value: form.location },
                      { label: 'Pickup Location', value: branches.find(b => b.id === form.pickupLocation)?.name || form.pickupLocation },
                    ].map((field) => (
                      <div key={field.label}>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{field.label}</p>
                        <p className="text-gray-900 font-medium">{field.value}</p>
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Additional Requirements</p>
                      <p className="text-gray-900 font-medium whitespace-pre-wrap">{form.message || 'No additional requirements provided.'}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Product Specifications</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.cartItemId} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-gray-900">{item.name}</span>
                            <span className="text-xs font-bold text-[#63913D]">Qty: {item.quantity}</span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                          {item.customNotes ? (
                            <div className="bg-white p-3 rounded-lg border border-gray-100">
                              <p className="text-[11px] font-bold text-gray-400 mb-1 uppercase">Notes:</p>
                              <p className="text-xs text-gray-600 leading-relaxed italic">&quot;{item.customNotes}&quot;</p>
                            </div>
                          ) : (
                            <p className="text-[11px] text-gray-400 italic">No specific notes provided for this item.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formspree error display */}
                  {formspreeState.errors && formspreeState.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-600 text-sm font-semibold mb-1">Submission failed</p>
                      <p className="text-red-500 text-xs">Something went wrong. Please try again or contact us directly.</p>
                    </div>
                  )}

                  <div className="pt-8 border-t border-gray-100">
                    <button 
                      onClick={handleFinalSubmit}
                      disabled={formspreeState.submitting}
                      className={`btn-primary w-full !py-4 !rounded-xl text-lg shadow-xl shadow-[#63913D]/20 transition-all ${
                        formspreeState.submitting ? 'opacity-70 cursor-not-allowed' : 'animate-pulse-slow'
                      }`}
                    >
                      {formspreeState.submitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : 'Confirm & Submit Request'}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                      By confirming, you agree to our team contacting you via email/phone regarding this request.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-2">
            <div className="card p-7 sticky top-24 !rounded-2xl animate-slideRight">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Selected Items</h3>
              <div className="space-y-4 mb-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex flex-col pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex justify-between gap-3 mb-1">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{item.category}</p>
                      </div>
                      <span className="text-sm text-[#63913D] font-bold flex-shrink-0">×{item.quantity}</span>
                    </div>
                    {item.customNotes && (
                      <p className="text-[10px] text-gray-500 italic line-clamp-1 mt-0.5">Note: {item.customNotes}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-5">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-500 text-sm">Total Items</span>
                  <span className="text-2xl text-gray-900">{itemCount}</span>
                </div>
              </div>
              
              {!isReviewing && (
                <div className="mt-8 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-gray-900 text-xs font-bold mb-3 uppercase tracking-wider">Helpful Tips</p>
                  <ul className="space-y-3">
                    {[
                      'Accurate farm size helps us calculate pipe lengths',
                      'Specific locations help us estimate delivery costs',
                      'Detailed notes help us recommend the right specs',
                    ].map((tip) => (
                      <li key={tip} className="text-gray-500 text-[11px] flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8FBB43] flex-shrink-0 mt-1.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
