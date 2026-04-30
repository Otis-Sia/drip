'use client';

import { useState } from 'react';
import Image from 'next/image';
import { branches } from '@/lib/branches';

const contactInfo = [
  { icon: '/email.svg', label: 'Email', value: 'info@afrodrip.co.ke' },
  { icon: '/phone.svg', label: 'Phone', value: '+254 711 506 498' },
  { icon: '/location_pin.svg', label: 'Address', value: 'Maasai Rd, off Mombasa Rd, Nairobi, Kenya' },
  { icon: '/clock.svg', label: 'Business Hours', value: 'Mon–Fri, 8:00 AM – 5:00 PM EAT' },
];

const socials = [
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'Twitter/X', href: '#', icon: '𝕏' },
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
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-6 backdrop-blur-sm mx-auto">Contact Us</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Get in Touch</h1>
          <p className="text-green-100/80 max-w-2xl mx-auto text-lg font-light animate-fadeInUp delay-100">Have a question, need a consultation, or ready to request a quote? We&apos;d love to hear from you.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-28 bg-[#f8fafc] mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8 animate-fadeInUp">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Image src={item.icon} alt="" width={22} height={22} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</div>
                        <div className="text-gray-900 font-medium mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="w-10 h-10 rounded-xl bg-[#63913D] text-white flex items-center justify-center font-bold hover:bg-[#8FBB43] transition-all duration-300 text-sm hover:scale-110"
                      title={s.name}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#63913D] to-[#8FBB43] rounded-2xl p-7 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8FBB43]/30 to-transparent rounded-bl-[40px]" />
                <h3 className="font-bold mb-2 relative">Need an Urgent Response?</h3>
                <p className="text-green-200/60 text-sm mb-5 leading-relaxed relative">For critical farm installations or urgent inquiries, please call our priority line.</p>
                <div className="bg-gradient-to-r from-white to-[#57D6F2] bg-clip-text text-transparent font-black text-xl relative">+254 711 506 498</div>
                <div className="text-green-300/50 text-xs mt-1 font-medium relative">Available for agricultural emergencies</div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fadeInUp delay-200">
              {submitted ? (
                <div className="card p-12 !rounded-2xl text-center animate-scaleIn">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#63913D] to-[#8FBB43] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">Thank you, {form.name}. We&apos;ll get back to you at <strong>{form.email}</strong> within 1 business day.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="btn-secondary"
                    id="contact-send-another"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="card p-8 !rounded-2xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-7">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`input-field ${errors.name ? 'error' : ''}`}
                          placeholder="Juan dela Cruz"
                          id="contact-name"
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
                          id="contact-email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="input-field"
                          placeholder="+63 912 345 6789"
                          id="contact-phone"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="input-field"
                          placeholder="How can we help?"
                          id="contact-subject"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className={`input-field resize-none ${errors.message ? 'error' : ''}`}
                        placeholder="Describe your needs, questions, or how we can assist you..."
                        id="contact-message"
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full !py-3.5 !rounded-xl text-base" id="contact-submit">
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">Find Us</div>
            <h2 className="section-title mx-auto">16 Branches Nationwide</h2>
            <p className="section-subtitle mx-auto">Visit any of our offices across Kenya for in-person consultations and support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(['Nairobi & Central', 'Rift Valley', 'Eastern & Coast', 'Western & Nyanza'] as const).map((region) => {
              const regionBranches = branches.filter((b) => b.region === region);
              return (
                <div key={region} className="space-y-6">
                  <h3 className="text-lg font-bold text-[#63913D] border-b-2 border-[#8FBB43] pb-2 mb-4">
                    {region}
                  </h3>
                  <div className="space-y-4">
                    {regionBranches.map((branch) => (
                      <div key={branch.id} className="card p-5 hover:border-[#63913D]/30 transition-all duration-300">
                        <h4 className="font-bold text-gray-900 text-sm mb-2">{branch.name}</h4>
                        <div className="space-y-1.5 text-xs text-gray-500 font-medium">
                          <p className="flex items-start gap-2">
                            <Image src="/location_pin.svg" alt="" width={14} height={14} className="text-[#63913D] flex-shrink-0 mt-0.5" />
                            <span>{branch.address}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Image src="/phone.svg" alt="" width={14} height={14} className="flex-shrink-0" />
                            <span>{branch.phone}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Image src="/email.svg" alt="" width={14} height={14} className="flex-shrink-0" />
                            <span className="break-all">{branch.email}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
