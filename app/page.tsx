import Link from 'next/link';
import Image from 'next/image';
import { serviceSummaries } from '@/lib/services';
import { companyStats } from '@/lib/company';
import ServiceCard from '@/components/services/ServiceCard';
import { events } from '@/lib/communication';
import Calendar from '@/components/communication/Calendar';
import { allProducts, categoryMap } from '@/lib/products';

const featuredProducts = allProducts.slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero text-white pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl animate-fadeInUp">
            <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20">
              Modern Agricultural Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Cultivating Innovation
              <br />
              <span className="bg-gradient-to-r from-[#BAE6FD] to-[#57D6F2] bg-clip-text text-transparent">in Every Field</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-10 leading-relaxed max-w-2xl font-light">
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
            {companyStats.map((stat, i) => (
              <div key={stat.label} className={`animate-fadeInUp delay-${(i + 1) * 100}`}>
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#8FBB43] to-[#57D6F2] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[#8FBB43]/80 text-sm mt-2 font-medium">{stat.label}</div>
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
                  <div className="w-12 h-12 rounded-xl glass-icon flex items-center justify-center flex-shrink-0">
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
            {serviceSummaries.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
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
            {featuredProducts.map((product, i) => (
              <div
                key={product.id}
                className={`card p-6 flex flex-col animate-fadeInUp delay-${(i + 1) * 100}`}
              >
                <div className="badge mb-4 w-fit">{categoryMap[product.category] || product.category}</div>
                <h3 className="text-gray-900 font-bold mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-5 flex-1">{product.description}</p>
                <Link
                  href={`/shop/product-description?id=${product.id}`}
                  className="text-[#63913D] hover:brightness-90 text-sm font-semibold flex items-center gap-1.5 transition-colors group/link"
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

      {/* Calendar Preview Section */}
      <section className="py-20 md:py-28 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fadeInLeft">
              <div className="section-label">Events & Schedule</div>
              <h2 className="section-title">Stay Updated with Afrodrip</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Keep track of our upcoming workshops, webinars, and community events. Join us in our mission to promote sustainable agriculture through innovation and education.
              </p>
              <Link href="/communication" className="btn-secondary" id="home-view-all-events">
                View All Updates
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="animate-fadeInRight">
              <Calendar events={events.slice(0, 3)} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-cta text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Ready to Transform Your Farm?</h2>
          <p className="text-white mb-10 max-w-2xl mx-auto text-lg font-light">
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
