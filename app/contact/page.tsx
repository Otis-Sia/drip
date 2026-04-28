'use client';

import { useState } from 'react';

const contactInfo = [
  { icon: '✉', label: 'Email', value: 'info@dripph.com' },
  { icon: '☎', label: 'Phone', value: '+63 (2) 8123-4567' },
  { icon: '⌂', label: 'Address', value: 'BGC, Taguig City, Metro Manila, Philippines' },
  { icon: '🕐', label: 'Business Hours', value: 'Mon–Fri, 8:00 AM – 6:00 PM PHT' },
];

const socials = [
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'Twitter/X', href: '#', icon: 'X' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide mb-3">Contact Us</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Get in Touch</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">Have a question, need a consultation, or ready to request a quote? We&apos;d love to hear from you.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">{item.label}</div>
                        <div className="text-gray-900 font-medium">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map(s => (
                    <a key={s.name} href={s.href} className="bg-blue-800 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold hover:bg-blue-700 transition-colors text-sm" title={s.name}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-800 to-indigo-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Need an Urgent Response?</h3>
                <p className="text-blue-100 text-sm mb-4">For critical security incidents or urgent inquiries, please call our priority line.</p>
                <div className="text-cyan-300 font-bold text-lg">+63 (2) 8123-4568</div>
                <div className="text-blue-200 text-xs mt-1">Available 24/7 for security emergencies</div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm text-center">
                  <div className="text-5xl mb-6">✅</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you, {form.name}. We&apos;ll get back to you at {form.email} within 1 business day.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-400' : 'border-gray-300'}`} placeholder="Juan dela Cruz" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`} placeholder="juan@company.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+63 912 345 6789" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How can we help?" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.message ? 'border-red-400' : 'border-gray-300'}`} placeholder="Describe your needs, questions, or how we can assist you..." />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
