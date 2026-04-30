import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | DRIP',
  description: 'Learn about Afrodrip Limited, our mission, vision, and the team behind our success.',
};

const values = [
  { icon: '/innovation.svg', title: 'Innovation', description: 'Continuously evolving to bring cutting-edge solutions to modern farming.' },
  { icon: '/quality.svg', title: 'Quality', description: 'Delivering durable, premium infrastructure built to withstand real-world conditions.' },
  { icon: '/sustainable.svg', title: 'Sustainability', description: 'Promoting practices that conserve water, protect soil, and ensure long-term viability.' },
  { icon: '/customer_focus.svg', title: 'Customer Focus', description: 'Working hand-in-hand with farmers to meet their specific needs and goals.' },
  { icon: '/lock.svg', title: 'Integrity', description: 'Operating with transparency, honesty, and ethical standards in all our engagements.' },
];

const targetMarkets = [
  { icon: '/farmer_first.svg', title: 'Smallholder Farmers', desc: 'Affordable, scalable systems to increase yield and profitability on smaller plots of land.' },
  { icon: '/commercial_farms.svg', title: 'Commercial Farms', desc: 'Large-scale, high-efficiency infrastructure for massive agricultural operations.' },
  { icon: '/institutions.svg', title: 'Institutions', desc: 'Schools, universities, and research centers developing agricultural programs.' },
  { icon: '/agribusiness.svg', title: 'Agribusiness Investors', desc: 'Reliable turnkey farming solutions for investors looking for strong ROI.' },
];

const gradientColors = [
  'from-[#63913D] to-[#8FBB43]',
  'from-[#8FBB43] to-[#57D6F2]',
  'from-[#57D6F2] to-[#63913D]',
  'from-[#8FBB43] to-[#63913D]',
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-6 backdrop-blur-sm mx-auto">About Afrodrip</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Who We Are</h1>
          <p className="text-green-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            We are a modern agricultural solutions company specializing in greenhouse accessories, irrigation systems, and climate-smart farming technologies.
          </p>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-20 md:py-28 bg-white mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">Our Story</div>
              <h2 className="section-title">Built on Expertise, Driven by Purpose</h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Founded in 2018 and headquartered in Nairobi, Afrodrip Limited delivers innovative farming infrastructure designed to improve productivity and sustainability. We empower farmers to increase productivity, conserve water, and grow crops year-round.
              </p>
              <div className="bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 border border-[#63913D]/15 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#63913D] to-[#8FBB43] flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                    <Image src="/trophy.svg" alt="Award" width={28} height={28} className="invert brightness-200" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Award Winning Excellence</h3>
                    <p className="text-sm text-gray-600">Winner: 2025 Avocado Industry Excellence Awards (Irrigation Category)</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Our vision is to lead the future of climate-smart agriculture through innovative greenhouse and irrigation technologies that enable farmers to grow more with less.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#63913D]/5 to-[#8FBB43]/5 rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8FBB43]/20 to-transparent rounded-bl-[60px]" />
              <div className="text-center relative">
                <div className="text-5xl font-black bg-gradient-to-r from-[#63913D] to-[#8FBB43] bg-clip-text text-transparent">2018</div>
                <div className="text-gray-500 text-sm mt-1 font-medium">Year Founded</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ['16+', 'Branches Nationwide'],
                  ['6', 'Countries in EA'],
                  ['Top', 'Irrigation Award'],
                  ['1000s', 'Farms Equipped'],
                  ['24/7', 'Technical Support'],
                  ['100%', 'Commitment']
                ].map(([val, label]) => (
                  <div key={label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100/50">
                    <div className="text-2xl font-black bg-gradient-to-r from-[#63913D] to-[#8FBB43] bg-clip-text text-transparent">{val}</div>
                    <div className="text-gray-400 text-xs mt-1 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 md:p-10 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image src="/target.svg" alt="Mission" width={32} height={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To empower farmers with affordable, efficient, and reliable greenhouse and irrigation systems that increase productivity, improve food security, and promote sustainable agriculture.
              </p>
            </div>
            <div className="card p-8 md:p-10 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#57D6F2]/10 to-[#63913D]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image src="/telescope.svg" alt="Vision" width={32} height={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed">
                To lead the future of climate-smart agriculture through innovative greenhouse and irrigation technologies that enable farmers to grow more with less.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">Our Values</div>
            <h2 className="section-title mx-auto">What Guides Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4 p-6 rounded-2xl bg-[#f8fafc] hover:bg-gradient-to-br hover:from-[#63913D]/5 hover:to-[#8FBB43]/5 transition-all duration-300 group border border-transparent hover:border-[#63913D]/15">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                  <Image src={value.icon} alt="" width={28} height={28} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">Who We Serve</div>
            <h2 className="section-title mx-auto">Our Target Market</h2>
            <p className="section-subtitle mx-auto">We partner with a diverse range of agricultural stakeholders to deliver tailored farming solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetMarkets.map((item) => (
              <div key={item.title} className="card p-6 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Image src={item.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-cta text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Partner with Afrodrip</h2>
          <p className="text-green-200/70 mb-10 max-w-xl mx-auto text-lg font-light">Ready to transform your agricultural productivity? Let&apos;s start the conversation.</p>
          <Link href="/contact" className="btn-primary !px-10 !py-3.5 text-base" id="about-cta-contact">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
