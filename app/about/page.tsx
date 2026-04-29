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

const gradientColors = [
  'from-cyan-500 to-blue-600',
  'from-blue-500 to-indigo-600',
  'from-indigo-500 to-purple-600',
  'from-teal-500 to-cyan-600',
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge bg-white/10 text-cyan-300 border border-cyan-400/20 mb-6 backdrop-blur-sm mx-auto">About DRIP</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Who We Are</h1>
          <p className="text-blue-100/80 max-w-3xl mx-auto text-lg leading-relaxed font-light animate-fadeInUp delay-100">
            We are a team of dedicated cybersecurity and digital informatics professionals committed to making the digital world safer for every organization we serve.
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
                DRIP was founded with a singular vision: to make enterprise-grade cybersecurity accessible to organizations of all sizes across the Philippines and Southeast Asia. What began as a small consulting practice has grown into a full-service digital security firm trusted by hundreds of organizations.
              </p>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Our founders recognized that the greatest vulnerability in any organization is not technology—it is the knowledge gap. Attackers exploit human error, outdated practices, and poorly designed systems. DRIP addresses all three through our integrated approach to security.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Today, we proudly serve government agencies, educational institutions, financial organizations, healthcare providers, and SMBs, delivering practical solutions that create lasting security improvements.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#f0f9ff] to-[#ede9fe] rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-200/30 to-transparent rounded-bl-[60px]" />
              <div className="text-center relative">
                <div className="text-5xl font-black bg-gradient-to-r from-[#1e3a5f] to-[#0891b2] bg-clip-text text-transparent">2009</div>
                <div className="text-gray-500 text-sm mt-1 font-medium">Year Founded</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ['500+', 'Clients Served'],
                  ['10,000+', 'Trained'],
                  ['50+', 'Expert Staff'],
                  ['15+', 'Years Experience'],
                  ['17', 'Branches Nationwide'],
                  ['24/7', 'Support Available']
                ].map(([val, label]) => (
                  <div key={label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100/50">
                    <div className="text-2xl font-black bg-gradient-to-r from-[#1e3a5f] to-[#0891b2] bg-clip-text text-transparent">{val}</div>
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
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To empower organizations and individuals with the knowledge, skills, and tools they need to thrive securely in the digital age. We deliver comprehensive cybersecurity training, innovative digital solutions, and expert consulting that protect, educate, and transform.
              </p>
            </div>
            <div className="card p-8 md:p-10 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🔭
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed">
                To be the most trusted digital security and informatics partner in Southeast Asia—recognized for our commitment to building a cybersecurity-aware society where every organization, regardless of size, can operate safely and confidently in the digital world.
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
              <div key={value.title} className="flex gap-4 p-6 rounded-2xl bg-[#f8fafc] hover:bg-gradient-to-br hover:from-cyan-50/50 hover:to-blue-50/50 transition-all duration-300 group border border-transparent hover:border-cyan-100/50">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                  {value.icon}
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

      {/* Team */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">Leadership</div>
            <h2 className="section-title mx-auto">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className="card p-7 text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${gradientColors[i % gradientColors.length]} rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-5 group-hover:scale-110 group-hover:rounded-xl transition-all duration-500 shadow-lg`}>
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-cyan-600 text-sm font-medium mb-3">{member.role}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
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
            <h2 className="section-title mx-auto">Our Target Audience</h2>
            <p className="section-subtitle mx-auto">We partner with organizations across multiple sectors to deliver tailored security solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏛️', title: 'Government Agencies', desc: 'National and local government units requiring compliance and secure digital infrastructure.' },
              { icon: '🏫', title: 'Educational Institutions', desc: 'Universities and schools building digital literacy and protecting student data.' },
              { icon: '🏥', title: 'Healthcare Providers', desc: 'Hospitals and clinics safeguarding patient records and medical systems.' },
              { icon: '🏦', title: 'Financial Institutions', desc: 'Banks and fintech companies ensuring regulatory compliance and transaction security.' },
              { icon: '🏢', title: 'Enterprises', desc: 'Large organizations strengthening their overall cybersecurity posture.' },
              { icon: '🚀', title: 'SMBs & Startups', desc: 'Growing businesses establishing foundational security practices early.' },
            ].map((item) => (
              <div key={item.title} className="card p-6 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
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
          <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight">Partner with DRIP</h2>
          <p className="text-blue-200/70 mb-10 max-w-xl mx-auto text-lg font-light">Ready to strengthen your organization&apos;s digital security posture? Let&apos;s start the conversation.</p>
          <Link href="/contact" className="btn-primary !px-10 !py-3.5 text-base" id="about-cta-contact">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
