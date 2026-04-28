import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | DRIP',
  description: "Explore DRIP's comprehensive cybersecurity and digital solutions services.",
};

const services = [
  {
    icon: '🛡️',
    title: 'Cybersecurity Training',
    tagline: 'Human-Centered Security',
    problem: 'Over 90% of security breaches involve human error. Your people are your greatest vulnerability—and your greatest asset when properly trained.',
    approach: 'Our Cybersecurity Training programs are built on real-world scenarios and attack simulations. We offer customized curricula for every level—from executive awareness sessions to deep technical workshops for IT teams.',
    features: [
      'Phishing simulation and awareness campaigns',
      'Incident response training',
      'CISSP, CEH, and CompTIA prep programs',
      'Hands-on red team/blue team exercises',
      'Security operations center (SOC) training',
    ],
    outcomes: 'Organizations typically see a 70% reduction in successful phishing attempts within 6 months of our training programs.',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    iconBg: 'from-cyan-50 to-blue-50',
  },
  {
    icon: '💡',
    title: 'Digital Literacy Programs',
    tagline: 'Empowering Every Employee',
    problem: 'The digital skills gap creates operational inefficiencies and security risks across your entire organization.',
    approach: 'We design digital literacy programs that meet employees where they are—from basic computer skills to advanced data analysis and secure digital communication practices.',
    features: [
      'Foundational digital skills bootcamps',
      'Secure communication and data handling',
      'Cloud productivity tool training',
      'Digital compliance and privacy practices',
      'Custom LMS content development',
    ],
    outcomes: 'Our clients report a 45% improvement in employee productivity and a measurable reduction in IT support tickets after program completion.',
    gradient: 'from-amber-500/10 to-orange-500/10',
    iconBg: 'from-amber-50 to-orange-50',
  },
  {
    icon: '🖥️',
    title: 'IT Consulting',
    tagline: 'Strategy Meets Execution',
    problem: 'Many organizations struggle to align their IT infrastructure with business objectives, leaving them exposed to inefficiencies and security gaps.',
    approach: 'Our IT consulting practice combines strategic planning with hands-on technical expertise. We assess your current state, design a secure target architecture, and guide implementation from start to finish.',
    features: [
      'IT security architecture review',
      'Cloud migration strategy and execution',
      'Zero-trust network design',
      'Vendor evaluation and procurement',
      'IT governance and policy development',
    ],
    outcomes: 'Clients achieve an average 30% reduction in IT-related security incidents within 12 months of implementing our recommended architecture.',
    gradient: 'from-indigo-500/10 to-purple-500/10',
    iconBg: 'from-indigo-50 to-purple-50',
  },
  {
    icon: '🗄️',
    title: 'Data Management',
    tagline: 'Secure, Compliant, Accessible',
    problem: 'Data is your most valuable asset and your biggest liability. Mismanaged data leads to breaches, compliance failures, and lost business.',
    approach: "DRIP's Data Management solutions cover the full lifecycle—from data classification and governance to backup automation and disaster recovery planning.",
    features: [
      'Data classification and labeling',
      'Automated backup and recovery solutions',
      'Data loss prevention (DLP) implementation',
      'Regulatory compliance (PDPA, GDPR, ISO 27001)',
      'Database security audits',
    ],
    outcomes: 'Our data management implementations have helped clients achieve full regulatory compliance and recover from ransomware attacks with zero data loss.',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    iconBg: 'from-emerald-50 to-teal-50',
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge bg-white/10 text-cyan-300 border border-cyan-400/20 mb-6 backdrop-blur-sm mx-auto">Our Services</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Comprehensive Digital Security Solutions</h1>
          <p className="text-blue-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            From training your people to securing your systems, DRIP delivers end-to-end digital security services tailored to your organization&apos;s unique needs.
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
              <div className="bg-emerald-50/80 border border-emerald-200/50 rounded-2xl p-5">
                <p className="text-emerald-700 font-semibold text-sm mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
                  Proven Results
                </p>
                <p className="text-emerald-600/80 text-sm leading-relaxed">{service.outcomes}</p>
              </div>
            </div>

            <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
              <div className={`bg-gradient-to-br ${service.gradient} rounded-3xl p-8 border border-gray-100/50`}>
                <h3 className="font-bold text-gray-900 mb-5 text-lg">What&apos;s Included</h3>
                <ul className="space-y-3.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
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
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Not Sure Where to Start?</h2>
          <p className="text-blue-200/70 mb-10 max-w-xl mx-auto text-lg font-light">Our experts will assess your current security posture and recommend the right combination of services for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary !px-10 !py-3.5 text-base" id="services-cta-assessment">
              Schedule a Free Assessment
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
