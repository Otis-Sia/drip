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
      <section className="gradient-hero text-white pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl animate-fadeInUp">
            <div className="badge bg-white/10 text-cyan-300 border border-cyan-400/20 mb-6 backdrop-blur-sm">
              Cybersecurity &amp; Digital Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Secure Your Digital
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">Future Today</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed max-w-2xl font-light">
              DRIP empowers organizations with world-class cybersecurity training, digital literacy programs, and innovative IT solutions tailored for the modern threat landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="btn-primary !px-10 !py-3.5 text-base" id="hero-explore-services">
                Explore Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline !px-10 !py-3.5 text-base" id="hero-get-in-touch">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Floating decorative shapes */}
        <div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 z-0">
          <div className="relative w-[300px] h-[300px] animate-float">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/10 rotate-12" />
            <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-cyan-400/8 to-blue-500/8 backdrop-blur-sm border border-white/5 -rotate-6" />
            <div className="absolute inset-12 rounded-xl bg-gradient-to-br from-cyan-300/5 to-indigo-400/5 border border-white/5 rotate-3 flex items-center justify-center">
              <div className="text-6xl opacity-60">🔒</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0a1929] text-white py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-indigo-900/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`animate-fadeInUp delay-${(i + 1) * 100}`}>
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-blue-300/60 text-sm mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-20 md:py-28 bg-white mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">
                Philippines&apos; Leading Digital Security Partner
              </h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                DRIP – Digital Resources &amp; Informatics Professionals – is a premier provider of cybersecurity training and digital solutions. We help businesses and government agencies navigate the complex digital landscape securely.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Founded by industry veterans with decades of combined experience in IT security and digital education, DRIP delivers practical, results-driven programs that protect organizations and empower their people.
              </p>
              <Link href="/about" className="btn-secondary" id="home-learn-more">
                Learn More About Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { icon: '🎯', title: 'Mission-Driven', desc: 'Every solution we deliver is designed to achieve measurable security outcomes.' },
                { icon: '🤝', title: 'Client-Centered', desc: 'We build lasting partnerships, not just one-time engagements.' },
                { icon: '🔒', title: 'Security First', desc: 'Security is embedded in everything we do, from consultation to delivery.' },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`card !rounded-xl p-5 flex gap-4 items-start animate-fadeInUp delay-${(i + 1) * 200}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title mx-auto">Comprehensive Digital Security Services</h2>
            <p className="section-subtitle mx-auto">From training your team to securing your infrastructure, DRIP offers end-to-end digital security solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`card p-7 group animate-fadeInUp delay-${(i + 1) * 100}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary" id="home-view-services">
              View All Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">Our Products</div>
            <h2 className="section-title mx-auto">Featured Solutions</h2>
            <p className="section-subtitle mx-auto">Explore our curated selection of cybersecurity products and solutions designed for businesses of all sizes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`card p-6 flex flex-col animate-fadeInUp delay-${(i + 1) * 100}`}
              >
                <div className="badge mb-4 w-fit">{product.category}</div>
                <h3 className="text-gray-900 font-bold mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-5 flex-1">{product.description}</p>
                <Link
                  href={`/shop/product-description?id=${product.id}`}
                  className="text-cyan-600 hover:text-cyan-500 text-sm font-semibold flex items-center gap-1.5 transition-colors group/link"
                >
                  Request Quote
                  <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-outline-dark" id="home-browse-products">
              Browse All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-cta text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Ready to Secure Your Organization?</h2>
          <p className="text-blue-200/70 mb-10 max-w-2xl mx-auto text-lg font-light">
            Let our experts help you build a comprehensive cybersecurity strategy tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary !px-10 !py-3.5 text-base" id="cta-contact">
              Contact Us Today
            </Link>
            <Link href="/shop" className="btn-outline !px-10 !py-3.5 text-base" id="cta-products">
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
