import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Afrodrip Limited',
  description: "Explore Afrodrip's comprehensive agricultural solutions, from greenhouse design to irrigation systems.",
};

const services = [
  {
    icon: '🌱',
    title: 'Greenhouse Design and Supply',
    tagline: 'Year-Round Cultivation',
    problem: 'Unpredictable weather and harsh climate conditions can devastate open-field crops, leading to significant financial losses.',
    approach: 'We design and construct durable, modern greenhouse structures tailored to your specific location and crop requirements. Our systems provide the optimal controlled environment for maximum yield.',
    features: [
      'Custom structural design',
      'High-quality UV treated polythene',
      'Ventilation and temperature control',
      'Pest exclusion netting',
      'Turnkey installation',
    ],
    outcomes: 'Farmers experience up to 300% yield increases and extended growing seasons compared to traditional open-field farming.',
    gradient: 'from-[#63913D]/10 to-[#8FBB43]/10',
    iconBg: 'from-[#63913D]/15 to-[#8FBB43]/15',
  },
  {
    icon: '💧',
    title: 'Irrigation System Installation',
    tagline: 'Precision Water Management',
    problem: 'Water scarcity and inefficient irrigation methods waste valuable resources and reduce crop health.',
    approach: 'We provide state-of-the-art irrigation solutions including drip lines and automated systems. We ensure every drop of water is utilized efficiently directly at the plant root zone.',
    features: [
      'Drip and sprinkler system design',
      'Water pump installation',
      'Automated timer integration',
      'Filtration systems',
      'Water storage and dam liners',
    ],
    outcomes: 'Reduce water usage by up to 50% while simultaneously increasing crop uniformity and health.',
    gradient: 'from-[#57D6F2]/10 to-[#63913D]/10',
    iconBg: 'from-[#57D6F2]/15 to-[#63913D]/15',
  },
  {
    icon: '☀️',
    title: 'Climate-Smart Farming Solutions',
    tagline: 'Adapt and Thrive',
    problem: 'Climate change introduces unprecedented challenges, from prolonged droughts to extreme temperatures.',
    approach: 'We integrate advanced technologies that help farms adapt to changing climates, utilizing shade nets, mulching, and smart agricultural practices to mitigate environmental risks.',
    features: [
      'Micro-climate monitoring',
      'Shade net installation',
      'Mulching solutions',
      'Soil moisture conservation',
      'Agro-meteorological advisory',
    ],
    outcomes: 'Enhanced farm resilience against extreme weather events and reduced crop failure rates.',
    gradient: 'from-amber-500/10 to-orange-500/10',
    iconBg: 'from-amber-50 to-orange-50',
  },
  {
    icon: '🏗️',
    title: 'Agricultural Infrastructure',
    tagline: 'Building the Foundation',
    problem: 'Lack of proper infrastructure limits farm expansion and operational efficiency.',
    approach: 'From land preparation to the construction of water reservoirs and crop protection structures, we build the physical foundation your agribusiness needs to scale.',
    features: [
      'Dam liner supply and installation',
      'Farm layout planning',
      'Storage facilities setup',
      'Erosion control structures',
      'Fencing and security',
    ],
    outcomes: 'Robust farm infrastructure that supports long-term growth and operational efficiency.',
    gradient: 'from-[#57D6F2]/10 to-[#8FBB43]/10',
    iconBg: 'from-[#57D6F2]/15 to-[#8FBB43]/15',
  },
  {
    icon: '🧑‍🌾',
    title: 'Farmer Training and Support',
    tagline: 'Empowering Growers',
    problem: 'Access to modern equipment is not enough; farmers need the knowledge to utilize it effectively to achieve ROI.',
    approach: 'We provide comprehensive training programs and ongoing technical support to ensure you get the most out of your agricultural investments.',
    features: [
      'On-site agronomic training',
      'System operation workshops',
      'Pest and disease management',
      'Best farming practices',
      'Dedicated agronomy support line',
    ],
    outcomes: 'Empowered farm workers capable of maximizing the utility and lifespan of modern farming systems.',
    gradient: 'from-indigo-500/10 to-blue-500/10',
    iconBg: 'from-indigo-50 to-blue-50',
  },
  {
    icon: '🔧',
    title: 'Maintenance Services',
    tagline: 'Continuous Reliability',
    problem: 'Equipment breakdowns can halt operations and jeopardize crop health if not addressed immediately.',
    approach: 'Our dedicated maintenance teams offer routine servicing and rapid response repairs for all greenhouse and irrigation systems.',
    features: [
      'Routine system inspections',
      'Polythene and net repairs',
      'Pump and filter maintenance',
      'Spare parts supply',
      'Emergency breakdown response',
    ],
    outcomes: 'Minimized downtime and prolonged lifespan of your critical agricultural infrastructure.',
    gradient: 'from-lime-500/10 to-green-500/10',
    iconBg: 'from-lime-50 to-green-50',
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-6 backdrop-blur-sm mx-auto">Our Services</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Comprehensive Agricultural Solutions</h1>
          <p className="text-green-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            From planning and designing your greenhouse to installing irrigation systems and providing ongoing support, Afrodrip delivers end-to-end farming infrastructure tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {services.map((service, index) => (
          <section
            key={service.title}
            id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-start ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
          >
            <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center text-4xl mb-5`}>
                {service.icon}
              </div>
              <div className="section-label">{service.tagline}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">{service.title}</h2>

              {/* Problem */}
              <div className="bg-red-50/80 border-l-4 border-red-400/80 p-5 rounded-r-xl mb-6">
                <p className="text-red-800/80 text-sm font-semibold mb-1">The Challenge</p>
                <p className="text-gray-600 text-sm leading-relaxed">{service.problem}</p>
              </div>

              <p className="text-gray-500 leading-relaxed mb-6">{service.approach}</p>

              {/* Outcomes */}
              <div className="bg-[#63913D]/10 border border-[#63913D]/20 rounded-2xl p-5">
                <p className="text-[#63913D] font-semibold text-sm mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#63913D] text-white flex items-center justify-center text-xs">✓</span>
                  Proven Results
                </p>
                <p className="text-[#63913D]/80 text-sm leading-relaxed">{service.outcomes}</p>
              </div>
            </div>

            <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
              <div className={`bg-gradient-to-br ${service.gradient} rounded-3xl p-8 border border-gray-100/50`}>
                <h3 className="font-bold text-gray-900 mb-5 text-lg">What&apos;s Included</h3>
                <ul className="space-y-3.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#63913D]/10 text-[#63913D] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/contact" className="btn-secondary block text-center" id={`service-cta-${index}`}>
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="gradient-cta text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Ready to Start Your Project?</h2>
          <p className="text-green-200/70 mb-10 max-w-xl mx-auto text-lg font-light">Our agricultural experts will assess your farm's requirements and recommend the right combination of services for your needs.</p>
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
