import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="main-footer" className="relative mt-auto overflow-hidden bg-[#13210d] text-gray-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8FBB43]/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-[#63913D]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[#57D6F2]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-[#63913D] to-[#8FBB43] px-3.5 py-1.5 text-xl font-black text-white">
                DRIP
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Afrodrip Limited</div>
                <div className="text-xs font-medium text-[#8FBB43]">Climate-smart agricultural solutions</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-500">
              We design and supply greenhouse systems, irrigation solutions, and farm infrastructure that help growers build more productive, resilient operations.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { name: 'Instagram', href: 'https://www.instagram.com/afrodrip254?igsh=MWwwb3BrazhyaWxrcw==', icon: '/instagram.svg' },
                { name: 'Facebook', href: 'https://www.facebook.com/share/1CiLi5Nef3/', icon: '/facebook.svg' },
                { name: 'TikTok', href: 'https://www.tiktok.com/@afrodripltd?is_from_webapp=1&sender_device=pc', icon: '/tiktok.svg' },
                { name: 'Email', href: 'mailto:info@afrodrip.co.ke', icon: '/email.svg' },
                { name: 'Call', href: 'tel:+254711506498', icon: '/phone.svg' },
                { name: 'Contact', href: '/contact', icon: '/chain_link.svg' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  title={item.name}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-400 transition-all duration-300 hover:border-[#63913D]/40 hover:bg-[#63913D]/10 hover:text-[#8FBB43]"
                >
                  <Image src={item.icon} alt={item.name} width={18} height={18} className="invert opacity-60" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                ['/', 'Home'],
                ['/about', 'About'],
                ['/services', 'Services'],
                ['/shop', 'Shop'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-2 text-gray-500 transition-colors duration-200 hover:text-[#8FBB43]">
                    <span className="h-1 w-1 rounded-full bg-[#8FBB43]/50" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Solutions</h3>
            <ul className="space-y-3 text-sm">
              {[
                'Greenhouse Accessories',
                'Irrigation Systems',
                'Climate-Smart Farming',
                'Technical Support',
              ].map((s) => (
                <li key={s} className="flex items-center gap-2 text-gray-500">
                  <span className="h-1 w-1 rounded-full bg-[#8FBB43]/50" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="space-y-4 text-sm">
              {[
                { icon: '/email.svg', text: 'info@afrodrip.co.ke', href: 'mailto:info@afrodrip.co.ke' },
                { icon: '/phone.svg', text: '+254 711 506 498', href: 'tel:+254711506498' },
                { icon: '/location_pin.svg', text: 'Maasai Rd, off Mombasa Rd, Nairobi, Kenya', href: '/contact' },
                { icon: '/clock.svg', text: 'Mon–Fri, 8:00 AM – 5:00 PM EAT', href: '/contact' },
              ].map((item) => (
                <li key={item.text}>
                  <Link href={item.href} className="flex items-start gap-3 text-gray-500 transition-colors duration-200 hover:text-[#8FBB43]">
                    <span className="mt-0.5 flex-shrink-0">
                      <Image src={item.icon} alt="" width={14} height={14} className="invert opacity-50" />
                    </span>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 text-sm text-gray-600 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} Afrodrip Limited. All rights reserved.</p>
            <p className="text-xs">
              Designed & Developed by{' '}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 transition-colors duration-200 hover:text-[#8FBB43] font-medium"
              >
                Cedar
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 sm:mt-0">
            <Link href="/about" className="transition-colors duration-200 hover:text-[#8FBB43]">About</Link>
            <Link href="/services" className="transition-colors duration-200 hover:text-[#8FBB43]">Services</Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-[#8FBB43]">Get in touch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
