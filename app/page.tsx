import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    icon: '/green_house.svg',
    title: 'Greenhouse Systems',
    description: 'Modern, durable greenhouse structures tailored to your specific crop requirements and local climate conditions.',
  },
  {
    icon: '/irrigation_systems.svg',
    title: 'Irrigation Systems',
    description: 'Efficient water management solutions including drip irrigation, sprinklers, and automated delivery systems.',
  },
  {
    icon: '/Climate_smart_solutions.svg',
    title: 'Climate-Smart Solutions',
    description: 'Advanced farming technologies designed to maximize yields while adapting to changing environmental factors.',
  },
  {
    icon: '/Agricultural_infrastructure.svg',
    title: 'Agricultural Infrastructure',
    description: 'Comprehensive infrastructure development from dam liners to specialized crop protection nets.',
  },
];

const products = [
  { id: 'uv-greenhouse-polythene', name: 'UV Open Greenhouse Polythene', category: 'Greenhouse Materials', description: 'High-quality, durable polythene for optimal light transmission.' },
  { id: 'drip-lines-16mm', name: 'Driplines (0.4mm)', category: 'Irrigation Systems', description: 'Precision drip irrigation lines for efficient water delivery.' },
  { id: 'dam-liners-0-5mm', name: 'Dam Liners (0.5mm)', category: 'Water Management', description: 'Heavy-duty liners for water conservation and storage.' },
  { id: 'shade-nets-75', name: 'Shade Nets (75%)', category: 'Nets & Crop Protection', description: 'Premium shade nets to protect crops from intense sunlight.' },
];

const stats = [
  { value: '2018', label: 'Year Established' },
  { value: '16+', label: 'Branches Nationwide' },
  { value: '6', label: 'Countries Present' },
  { value: '1st', label: 'Irrigation Excellence 2025' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero text-white pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl animate-fadeInUp">
            <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-6 backdrop-blur-sm">
              Modern Agricultural Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Cultivating Innovation
              <br />
              <span className="bg-gradient-to-r from-[#8FBB43] to-[#57D6F2] bg-clip-text text-transparent">in Every Field</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100/80 mb-10 leading-relaxed max-w-2xl font-light">
              Afrodrip Limited empowers farmers with cutting-edge greenhouse systems, efficient irrigation, and climate-smart technologies to increase productivity and conserve resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn-primary !px-10 !py-3.5 text-base" id="hero-explore-products">
                Explore Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline !px-10 !py-3.5 text-base" id="hero-get-in-touch">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Floating decorative shapes */}
        <div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 z-0">
          <div className="relative w-[300px] h-[300px] animate-float">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8FBB43]/10 to-[#57D6F2]/10 backdrop-blur-xl border border-white/10 rotate-12" />
            <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-[#8FBB43]/8 to-[#57D6F2]/8 backdrop-blur-sm border border-white/5 -rotate-6" />
            <div className="absolute inset-12 rounded-xl bg-gradient-to-br from-[#8FBB43]/5 to-[#57D6F2]/5 border border-white/5 rotate-3 flex items-center justify-center">
              <Image src="/afrodrip.svg" alt="Afrodrip Logo" width={180} height={180} className="opacity-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#324f1f] text-white py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#63913D]/10 via-transparent to-[#8FBB43]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`animate-fadeInUp delay-${(i + 1) * 100}`}>
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#8FBB43] to-[#57D6F2] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[#8FBB43]/60 text-sm mt-2 font-medium">{stat.label}</div>
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
                Pioneering Climate-Smart Agriculture
              </h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Afrodrip Limited is a modern agricultural solutions company specializing in greenhouse accessories, irrigation systems, and climate-smart farming technologies.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Founded in 2018 and headquartered in Nairobi, we deliver innovative farming infrastructure designed to improve productivity and sustainability for smallholder farmers and commercial agribusinesses alike.
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
                { icon: '/target.svg', title: 'Innovative Solutions', desc: 'Bringing modern technology to traditional farming for better yields.' },
                { icon: '/farmer_first.svg', title: 'Farmer First', desc: 'Empowering growers with affordable, efficient, and reliable infrastructure.' },
                { icon: '/sustainable_practise.svg', title: 'Sustainable Practice', desc: 'Promoting water conservation and climate-resilient agriculture.' },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`card !rounded-xl p-5 flex gap-4 items-start animate-fadeInUp delay-${(i + 1) * 200}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center flex-shrink-0">
                    <Image src={item.icon} alt="" width={28} height={28} />
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
            <h2 className="section-title mx-auto">Comprehensive Farming Solutions</h2>
            <p className="section-subtitle mx-auto">From greenhouse design to full irrigation system installation, Afrodrip offers end-to-end agricultural infrastructure.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`card p-7 group animate-fadeInUp delay-${(i + 1) * 100}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Image src={service.icon} alt="" width={32} height={32} />
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
            <h2 className="section-title mx-auto">Featured Agricultural Products</h2>
            <p className="section-subtitle mx-auto">Explore our high-quality greenhouse materials, irrigation components, and crop protection solutions.</p>
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
                  className="text-[#63913D] hover:text-[#8FBB43] text-sm font-semibold flex items-center gap-1.5 transition-colors group/link"
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
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Ready to Transform Your Farm?</h2>
          <p className="text-green-200/70 mb-10 max-w-2xl mx-auto text-lg font-light">
            Let our experts help you design and build a modern, high-yield agricultural system tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary !px-10 !py-3.5 text-base" id="cta-contact">
              Request a Quote
            </Link>
            <Link href="/shop" className="btn-outline !px-10 !py-3.5 text-base" id="cta-products">
              View Our Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
