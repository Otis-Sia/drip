"use client";

import Link from 'next/link';
import Image from 'next/image';
import { socials } from '@/lib/company';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <footer id="main-footer" className="relative mt-auto overflow-hidden bg-[#0a1206] text-gray-400">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#63913D]/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-[#8FBB43]/5 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-[#57D6F2]/5 blur-[110px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Top Border Gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8FBB43]/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Brand and Newsletter Section */}
          <div className="lg:col-span-5 space-y-8">
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
              <div className="space-y-4">
                <p className="max-w-md text-base leading-relaxed text-gray-300 font-medium">
                  Pioneering sustainable farming solutions through advanced greenhouse systems and precision irrigation technology. Empowering growers across Africa to achieve more with less.
                </p>
              </div>
            </div>

            {/* Newsletter Placeholder (Interactive UI) */}
            <div className="relative max-w-sm">
              <h3 className="text-sm font-semibold text-white mb-3">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8FBB43]/50 focus:ring-1 focus:ring-[#8FBB43]/50 transition-all"
                />
                <button className="bg-[#63913D] hover:bg-[#8FBB43] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-[#63913D]/20">
                  Join
                </button>
              </div>
              <p className="mt-2 text-[11px] text-gray-400">No spam, just seasonal updates and tech insights.</p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-10 sm:grid-cols-3">
            {/* Quick Links */}
            <div className="space-y-6 animate-fadeInUp delay-100">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8FBB43]">Explore</h3>
              <ul className="space-y-4">
                {[
                  ['/', 'Home'],
                  ['/about', 'Our Story'],
                  ['/services', 'Expertise'],
                  ['/shop', 'Solutions Shop'],
                  ['/contact', 'Contact Us'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                      <span className="w-0 h-px bg-[#8FBB43] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="space-y-6 animate-fadeInUp delay-200">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8FBB43]">Solutions</h3>
              <ul className="space-y-4 text-sm font-medium">
                {[
                  'Greenhouse Kits',
                  'Drip Irrigation',
                  'Hydroponic Systems',
                  'Technical Consulting',
                  'Farm Automation',
                ].map((s) => (
                  <li key={s} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-default flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full border border-[#8FBB43]/30 mr-3 transition-all duration-300 group-hover:bg-[#8FBB43] group-hover:scale-125" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 col-span-2 sm:col-span-1 animate-fadeInUp delay-300">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8FBB43]">Get in Touch</h3>
              <ul className="space-y-5">
                {[
                  { icon: '/email.svg', text: 'info@afrodrip.co.ke', href: 'mailto:info@afrodrip.co.ke' },
                  { icon: '/phone.svg', text: '+254 711 506 498', href: 'tel:+254711506498' },
                  { icon: '/location_pin.svg', text: 'Maasai Rd, Nairobi', href: '/contact' },
                ].map((item) => (
                  <li key={item.text}>
                    <Link href={item.href} className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-icon group-hover:border-[#8FBB43]/50 transition-all">
                        <Image src={item.icon} alt="" width={14} height={14} className="invert opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="truncate">{item.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col gap-8 md:flex-row md:items-center md:justify-between relative">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-400">
              © {new Date().getFullYear()} Afrodrip Limited. Crafted with precision for the modern grower.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
              <p>Operating Hours: Mon–Fri, 8:00 AM – 5:00 PM EAT</p>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-gray-700" />
              <p>
                Designed & Developed by{' '}
                <Link href="#" className="text-gray-400 hover:text-[#8FBB43] transition-colors font-medium underline underline-offset-4 decoration-gray-700 hover:decoration-[#8FBB43]">
                  Cedar
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {socials.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-500 hover:-translate-y-1 shadow-sm group/social"
                >
                  <div 
                    className={`w-[22px] h-[22px] transition-all duration-300 ${
                      item.name === 'Instagram' ? 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' :
                      item.name === 'Facebook' ? 'bg-[#1877F2]' :
                      'bg-white'
                    } opacity-80 group-hover/social:opacity-100 group-hover/social:scale-110`}
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
            <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block" />
            <div className="text-xs font-medium text-gray-400 flex gap-4">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            </div>
          </div>

          {/* Back to Top */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 group flex flex-col items-center gap-2"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-[#8FBB43]/30 group-hover:bg-[#8FBB43]/10 transition-all duration-300">
              <svg className="w-4 h-4 text-gray-500 group-hover:text-[#8FBB43] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

