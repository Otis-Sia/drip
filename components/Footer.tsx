import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-cyan-500 text-white font-black text-xl px-3 py-1 rounded-md">DRIP</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Digital Resources &amp; Informatics Professionals. Empowering organizations with cutting-edge cybersecurity and digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/shop', 'Shop'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-gray-400 hover:text-cyan-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Cybersecurity Training</li>
              <li>Digital Literacy Programs</li>
              <li>IT Consulting</li>
              <li>Data Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">✉</span>
                <span>info@dripph.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">☎</span>
                <span>+63 (2) 8123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">⌂</span>
                <span>Metro Manila, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DRIP – Digital Resources &amp; Informatics Professionals. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-cyan-300 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-cyan-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
