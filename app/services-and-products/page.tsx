import Link from 'next/link';
import type { Metadata } from 'next';
import { getServices } from '@/lib/services';
import { getAllProducts } from '@/lib/products';
import ServiceSection from '@/components/services/ServiceSection';
import ProductCard from '@/components/shop/ProductCard';
import SubNavbar from '@/components/services/SubNavbar';

export const metadata: Metadata = {
  title: 'Services and Products',
  description: "Explore Afrodrip's comprehensive agricultural solutions and high-quality products, from greenhouse design to irrigation systems.",
};

export default async function ServicesAndProductsPage() {
  const services = await getServices();
  const allProducts = await getAllProducts();
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section id="overview" className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20 mx-auto">Our Expertise</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Services and Products</h1>
          <p className="text-white max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            From professional farming services to high-quality agricultural materials, Afrodrip delivers end-to-end solutions tailored to your needs.
          </p>
        </div>
      </section>

      <SubNavbar />

      {/* Services Section */}
      <section id="services-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label">Solutions</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Expert installation and consultation services to help you scale your agricultural projects.</p>
          </div>
          <div className="space-y-20">
            {services.map((service, index) => (
              <ServiceSection key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-[#f8fafc] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="section-label">Catalog</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">High-Quality Products</h2>
              <p className="text-gray-500">We supply the best materials and equipment for modern farming, sourced from world-class manufacturers.</p>
            </div>
            <Link href="/services-and-products/catalog" className="btn-secondary whitespace-nowrap" id="view-full-catalog">
              View Full Catalog
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showCart={false} 
                descriptionPath="/services-and-products/product-description"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-cta text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Ready to Start Your Project?</h2>
          <p className="text-white mb-10 max-w-xl mx-auto text-lg font-light">Our agricultural experts will assess your farm&apos;s requirements and recommend the right combination of services and products for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#main-footer" className="btn-primary !px-10 !py-3.5 text-base" id="services-cta-assessment">
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
