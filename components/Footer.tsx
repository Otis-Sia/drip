import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-[#1a2e12] text-gray-300 mt-auto relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8FBB43]/40 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#63913D]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-br from-[#63913D] to-[#8FBB43] text-white font-black text-xl px-3.5 py-1.5 rounded-lg shadow-lg shadow-green-500/20">
                DRIP
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Afrodrip Limited. Empowering farmers with cutting-edge agricultural and climate-smart farming solutions.
            </p>
            <div className="flex gap-3">
              {[
                { name: 'LinkedIn', icon: 'in' },
                { name: 'Facebook', icon: 'f' },
                { name: 'X', icon: '𝕏' },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  title={s.name}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#8FBB43] hover:bg-[#63913D]/10 hover:border-[#63913D]/30 transition-all duration-300 text-sm font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/communications', 'Communications'], ['/shop', 'Shop'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-500 hover:text-[#8FBB43] transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#8FBB43]/50" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3 text-sm">
              {['Greenhouse Accessories', 'Irrigation Systems', 'Climate-Smart Farming', 'Technical Support'].map((s) => (
                <li key={s} className="text-gray-500 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#8FBB43]/50" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              {[
                { icon: '✉', text: 'info@dripph.com' },
                { icon: '☎', text: '+63 (2) 8123-4567' },
                { icon: '⌂', text: 'Metro Manila, Philippines' },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="text-[#8FBB43] mt-0.5 text-xs">{item.icon}</span>
                  <span className="text-gray-500">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Afrodrip Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-[#8FBB43] transition-colors duration-200">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#8FBB43] transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
