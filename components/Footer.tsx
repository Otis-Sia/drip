"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { socials, contactInfo } from '@/lib/company';
import { usePathname } from 'next/navigation';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';

export default function Footer() {
  const pathname = usePathname();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (pathname?.startsWith('/admin')) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <footer id="main-footer" className="relative mt-auto overflow-hidden bg-footer text-gray-400">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-primary-light/5 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-accent/5 blur-[110px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Top Border Gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & Urgent Response */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <Link href="/" className="inline-block group">
                <Image 
                  src="/afrodrip.svg" 
                  alt="Afrodrip Logo" 
                  width={180} 
                  height={56} 
                  className="h-12 w-auto brightness-0 invert opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                />
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-gray-300">
                Pioneering sustainable farming solutions through advanced greenhouse systems and precision irrigation technology. Empowering growers across Africa to achieve more with less.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-primary-dark/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-light/30 to-transparent rounded-bl-[30px]" />
              <h3 className="text-sm font-bold mb-1 relative">Need an Urgent Response?</h3>
              <p className="text-xs text-white/90 mb-4 relative">For critical farm installations or urgent inquiries.</p>
              <div className="text-white font-black text-lg relative tracking-tight">+254 711 506 498</div>
              <div className="text-white/70 text-[10px] mt-1 font-medium relative uppercase tracking-wider">Available for agricultural emergencies</div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Direct Contact</h3>
              <ul className="space-y-3">
                {contactInfo.map((item) => (
                  <li key={item.label}>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                        <Image src={item.icon} alt="" width={12} height={12} className="invert opacity-40" />
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Explore</h3>
              <ul className="space-y-3">
                {[
                  ['/', 'Home'],
                  ['/about', 'Our Story'],
                  ['/services-and-products', 'Expertise & Solutions'],
                  ['/communication', 'News'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                      <span className="w-0 h-px bg-primary-light mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Solutions</h3>
              <ul className="space-y-3 text-sm font-medium">
                {[
                  'Greenhouses',
                  'Irrigation',
                  'Hydroponics',
                  'Consulting',
                ].map((s) => (
                  <li key={s} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 rounded-full bg-primary-light/30 mr-2 group-hover:bg-primary-light" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8FBB43]/5 blur-3xl pointer-events-none" />
              
              {submitted ? (
                <div className="py-10 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-2xl bg-[#8FBB43] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircleIcon size={32} color="white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-400 mb-8">We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold uppercase tracking-widest text-[#8FBB43] hover:text-white transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({...form, name: e.target.value})}
                          className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-light/50 transition-all`}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={(e) => setForm({...form, email: e.target.value})}
                          className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-light/50 transition-all`}
                        />
                      </div>
                    </div>
                    <div>
                      <textarea
                        placeholder="How can we help?"
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                        className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-light/50 transition-all resize-none`}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98]"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col gap-8 md:flex-row md:items-center md:justify-between relative">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-400">
              © {new Date().getFullYear()} Afrodrip Limited. Precision Agriculture.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-gray-500">
              <p>Mon–Fri, 8:00 AM – 5:00 PM</p>
              <span className="h-1 w-1 rounded-full bg-gray-800" />
              <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              {socials.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-1 group/social"
                >
                  <div 
                    className={`w-5 h-5 transition-all duration-300 ${
                      item.name === 'Instagram' ? 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' :
                      item.name === 'Facebook' ? 'bg-[#1877F2]' :
                      'bg-white'
                    } opacity-70 group-hover/social:opacity-100`}
                    style={{
                      maskImage: `url(${item.icon})`,
                      WebkitMaskImage: `url(${item.icon})`,
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain'
                    }}
                  />
                </Link>
              ))}
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary-light transition-colors group"
            >
              <span>Back to Top</span>
              <div className="h-7 w-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-primary-light/30">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


