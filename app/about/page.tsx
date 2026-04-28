import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | DRIP',
  description: 'Learn about DRIP – Digital Resources & Informatics Professionals, our mission, vision, and the team behind our success.',
};

const values = [
  { icon: '🔐', title: 'Integrity', description: 'We operate with transparency and ethical standards in all our engagements.' },
  { icon: '🚀', title: 'Innovation', description: 'We continuously evolve our solutions to stay ahead of emerging threats.' },
  { icon: '🤝', title: 'Partnership', description: 'We build long-term relationships with our clients as trusted advisors.' },
  { icon: '📚', title: 'Education', description: 'We believe empowering people through knowledge is the foundation of security.' },
  { icon: '⚡', title: 'Excellence', description: 'We hold ourselves to the highest standards in everything we deliver.' },
  { icon: '🌏', title: 'Impact', description: 'We measure success by the real-world security improvements we create.' },
];

const team = [
  { name: 'Maria Santos', role: 'Chief Executive Officer', bio: '20+ years in cybersecurity and digital transformation across ASEAN enterprises.' },
  { name: 'Juan dela Cruz', role: 'Chief Technology Officer', bio: 'Former DICT technical advisor with expertise in national cybersecurity frameworks.' },
  { name: 'Ana Reyes', role: 'Head of Training & Education', bio: 'Certified information security professional with a passion for digital literacy education.' },
  { name: 'Carlos Mendoza', role: 'Head of IT Consulting', bio: 'Enterprise architect specializing in secure digital infrastructure for government and private sectors.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide mb-3">About DRIP</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Who We Are</h1>
          <p className="text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
            We are a team of dedicated cybersecurity and digital informatics professionals committed to making the digital world safer for every organization we serve.
          </p>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-3">Our Story</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Built on Expertise, Driven by Purpose</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                DRIP was founded with a singular vision: to make enterprise-grade cybersecurity accessible to organizations of all sizes across the Philippines and Southeast Asia. What began as a small consulting practice has grown into a full-service digital security firm trusted by hundreds of organizations.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our founders recognized that the greatest vulnerability in any organization is not technology—it is the knowledge gap. Attackers exploit human error, outdated practices, and poorly designed systems. DRIP addresses all three through our integrated approach to security.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we proudly serve government agencies, educational institutions, financial organizations, healthcare providers, and SMBs, delivering practical solutions that create lasting security improvements.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 space-y-6">
              <div className="text-center">
                <div className="text-5xl font-black text-blue-800">2009</div>
                <div className="text-gray-600 text-sm mt-1">Year Founded</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[['500+', 'Clients Served'], ['10,000+', 'Trained'], ['50+', 'Expert Staff'], ['15+', 'Years Experience']].map(([val, label]) => (
                  <div key={label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl font-black text-blue-800">{val}</div>
                    <div className="text-gray-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower organizations and individuals with the knowledge, skills, and tools they need to thrive securely in the digital age. We deliver comprehensive cybersecurity training, innovative digital solutions, and expert consulting that protect, educate, and transform.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6">🔭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted digital security and informatics partner in Southeast Asia—recognized for our commitment to building a cybersecurity-aware society where every organization, regardless of size, can operate safely and confidently in the digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-3">Our Values</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Guides Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(value => (
              <div key={value.title} className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <span className="text-3xl">{value.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-cyan-600 font-semibold text-sm uppercase tracking-wide mb-3">Leadership</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-700 text-sm font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner with DRIP</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Ready to strengthen your organization&apos;s digital security posture? Let&apos;s start the conversation.</p>
          <Link href="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
