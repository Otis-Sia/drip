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
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide mb-3">Our Services</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Comprehensive Digital Security Solutions</h1>
          <p className="text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
            From training your people to securing your systems, DRIP delivers end-to-end digital security services tailored to your organization&apos;s unique needs.
          </p>
        </div>
      </section>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {services.map((service, index) => (
          <section key={service.title} className={`grid md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
            <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
              <div className="text-5xl mb-4">{service.icon}</div>
              <div className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-2">{service.tagline}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-6">
                <p className="text-gray-700 text-sm font-medium">The Challenge</p>
                <p className="text-gray-600 text-sm mt-1">{service.problem}</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{service.approach}</p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-semibold text-sm mb-1">✓ Proven Results</p>
                <p className="text-green-700 text-sm">{service.outcomes}</p>
              </div>
            </div>
            <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="font-bold text-gray-900 mb-4">What&apos;s Included</h3>
                <ul className="space-y-3">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="text-cyan-600 mt-0.5 font-bold">✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/contact" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors block text-center text-sm">
                    Request a Consultation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Our experts will assess your current security posture and recommend the right combination of services for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Schedule a Free Assessment
            </Link>
            <Link href="/shop" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
