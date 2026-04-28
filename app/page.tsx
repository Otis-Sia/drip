import Link from 'next/link';

const services = [
  {
    icon: '🛡️',
    title: 'Cybersecurity Training',
    description: 'Equip your team with the skills to defend against modern cyber threats through hands-on, industry-aligned training programs.',
  },
  {
    icon: '💡',
    title: 'Digital Literacy Programs',
    description: 'Bridge the digital divide with comprehensive programs that build foundational and advanced digital skills across your organization.',
  },
  {
    icon: '🖥️',
    title: 'IT Consulting',
    description: 'Strategic technology guidance to align your IT infrastructure with your business goals and drive sustainable growth.',
  },
  {
    icon: '🗄️',
    title: 'Data Management',
    description: 'Secure, efficient data solutions that ensure your critical information is protected, accessible, and compliant.',
  },
];

const products = [
  { id: 'cybersecurity-starter-kit', name: 'Cybersecurity Starter Kit', category: 'Hardware Solutions', description: 'Complete security hardware bundle for SMBs' },
  { id: 'enterprise-firewall', name: 'Enterprise Firewall System', category: 'Hardware Solutions', description: 'Advanced network protection for enterprises' },
  { id: 'digital-training-package', name: 'Digital Training Package', category: 'Training & Education', description: 'Comprehensive online cybersecurity courses' },
  { id: 'cloud-security-bundle', name: 'Cloud Security Bundle', category: 'Software & Services', description: 'Multi-cloud security management platform' },
];

const stats = [
  { value: '500+', label: 'Organizations Served' },
  { value: '10,000+', label: 'Professionals Trained' },
  { value: '15+', label: 'Years of Expertise' },
  { value: '99.9%', label: 'Client Satisfaction' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
              Cybersecurity &amp; Digital Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Secure Your Digital<br />
              <span className="text-cyan-300">Future Today</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              DRIP empowers organizations with world-class cybersecurity training, digital literacy programs, and innovative IT solutions tailored for the modern threat landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-center">
                Explore Services
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors text-center">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-black text-cyan-300">{stat.value}</div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-3">Who We Are</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Philippines&apos; Leading Digital Security Partner
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                DRIP – Digital Resources &amp; Informatics Professionals – is a premier provider of cybersecurity training and digital solutions. We help businesses and government agencies navigate the complex digital landscape securely.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Founded by industry veterans with decades of combined experience in IT security and digital education, DRIP delivers practical, results-driven programs that protect organizations and empower their people.
              </p>
              <Link href="/about" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block">
                Learn More About Us
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="space-y-4">
                {[
                  { icon: '🎯', title: 'Mission-Driven', desc: 'Every solution we deliver is designed to achieve measurable security outcomes.' },
                  { icon: '🤝', title: 'Client-Centered', desc: 'We build lasting partnerships, not just one-time engagements.' },
                  { icon: '🔒', title: 'Security First', desc: 'Security is embedded in everything we do, from consultation to delivery.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-3">What We Offer</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Digital Security Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From training your team to securing your infrastructure, DRIP offers end-to-end digital security solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
              <div key={service.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-3">Our Products</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our curated selection of cybersecurity products and solutions designed for businesses of all sizes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-4 inline-block">{product.category}</div>
                <h3 className="text-gray-900 font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <Link href={`/shop/product-description?id=${product.id}`} className="text-blue-700 hover:text-blue-600 text-sm font-medium">
                  Request Quote →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Organization?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Let our experts help you build a comprehensive cybersecurity strategy tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Contact Us Today
            </Link>
            <Link href="/shop" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors">
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
