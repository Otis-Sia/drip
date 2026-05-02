import Link from 'next/link';
import type { Metadata } from 'next';
import { services } from '@/lib/services';
import ServiceSection from '@/components/services/ServiceSection';

export const metadata: Metadata = {
  title: 'Services | Afrodrip Limited',
  description: "Explore Afrodrip's comprehensive agricultural solutions, from greenhouse design to irrigation systems.",
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20 mx-auto">Our Services</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Comprehensive Agricultural Solutions</h1>
          <p className="text-white max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            From planning and designing your greenhouse to installing irrigation systems and providing ongoing support, Afrodrip delivers end-to-end farming infrastructure tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {services.map((service, index) => (
          <ServiceSection key={service.title} service={service} index={index} />
        ))}
      </div>

      {/* CTA */}
      <section className="gradient-cta text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Ready to Start Your Project?</h2>
          <p className="text-white mb-10 max-w-xl mx-auto text-lg font-light">Our agricultural experts will assess your farm&apos;s requirements and recommend the right combination of services for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary !px-10 !py-3.5 text-base" id="services-cta-assessment">
              Schedule a Free Consultation
            </Link>
            <Link href="/shop" className="btn-outline !px-10 !py-3.5 text-base" id="services-cta-products">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
