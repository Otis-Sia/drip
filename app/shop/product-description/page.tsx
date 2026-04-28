'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { Suspense, useState } from 'react';

const products: Record<string, {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  specs: { label: string; value: string }[];
  useCases: string[];
  tags: string[];
}> = {
  'cybersecurity-starter-kit': {
    id: 'cybersecurity-starter-kit',
    name: 'Cybersecurity Starter Kit',
    category: 'Hardware Solutions',
    description: 'Complete security hardware bundle for SMBs.',
    longDescription: 'The Cybersecurity Starter Kit is our most popular bundle for small and medium-sized businesses looking to establish a robust security baseline. It combines enterprise-grade hardware with simplified management to provide comprehensive protection without the complexity.',
    specs: [
      { label: 'Firewall Throughput', value: '1 Gbps' },
      { label: 'Endpoint Licenses', value: '10 included' },
      { label: 'Switch Ports', value: '24-port managed' },
      { label: 'Support', value: '1-year 24/7' },
      { label: 'Setup', value: 'Professional installation included' },
      { label: 'Warranty', value: '3 years hardware' },
    ],
    useCases: [
      'Small offices with 10–50 employees',
      'Retail businesses with POS systems',
      'Professional services firms',
      'Healthcare clinics and small hospitals',
    ],
    tags: ['Firewall', 'SMB', 'Hardware', 'Bundle'],
  },
  'enterprise-firewall': {
    id: 'enterprise-firewall',
    name: 'Enterprise Firewall System',
    category: 'Hardware Solutions',
    description: 'Advanced network protection for large organizations.',
    longDescription: 'The Enterprise Firewall System delivers carrier-grade network security for large enterprises. With 10 Gbps throughput, advanced threat prevention, and centralized management, it protects your entire network perimeter while maintaining high availability.',
    specs: [
      { label: 'Firewall Throughput', value: '10 Gbps' },
      { label: 'IPS Throughput', value: '5 Gbps' },
      { label: 'Concurrent Sessions', value: '10 million' },
      { label: 'HA Support', value: 'Active/Active, Active/Passive' },
      { label: 'Management', value: 'Centralized cloud console' },
      { label: 'Warranty', value: '5 years hardware' },
    ],
    useCases: [
      'Enterprise data centers',
      'Financial institutions',
      'Government agencies',
      'Large hospitals and healthcare networks',
    ],
    tags: ['Enterprise', 'NGFW', 'Network Security'],
  },
  'digital-training-package': {
    id: 'digital-training-package',
    name: 'Digital Training Package',
    category: 'Training & Education',
    description: 'Comprehensive online cybersecurity training for teams.',
    longDescription: 'Our Digital Training Package provides your team with access to a comprehensive library of cybersecurity courses, from foundational awareness to advanced technical certifications. All content is updated quarterly to reflect the latest threats and best practices.',
    specs: [
      { label: 'Course Modules', value: '50+ modules' },
      { label: 'Format', value: 'Self-paced, online' },
      { label: 'Access Period', value: '12 months' },
      { label: 'Certifications', value: 'CISSP, CEH, CompTIA prep' },
      { label: 'Languages', value: 'English, Filipino' },
      { label: 'Reporting', value: 'Admin dashboard + reports' },
    ],
    useCases: [
      'Corporate security awareness programs',
      'IT team upskilling and certification prep',
      'New employee onboarding',
      'Ongoing security education requirements',
    ],
    tags: ['Online', 'Certification', 'Team Training'],
  },
  'security-awareness-training': {
    id: 'security-awareness-training',
    name: 'Security Awareness Training',
    category: 'Training & Education',
    description: 'Automated phishing simulation and training platform.',
    longDescription: 'Our Security Awareness Training platform automates the entire security awareness lifecycle—from simulated phishing campaigns to just-in-time training delivery. Identify your most vulnerable employees and build a security-first culture.',
    specs: [
      { label: 'Phishing Templates', value: '1,000+ templates' },
      { label: 'Training Modules', value: '30+ modules' },
      { label: 'Reporting', value: 'Individual & department reports' },
      { label: 'Integrations', value: 'Active Directory, Google Workspace' },
      { label: 'Languages', value: 'English, Filipino' },
      { label: 'Deployment', value: 'Cloud-hosted SaaS' },
    ],
    useCases: [
      'Annual phishing resistance testing',
      'Compliance training requirements',
      'New employee security onboarding',
      'Incident-triggered training campaigns',
    ],
    tags: ['Phishing', 'Awareness', 'Simulation'],
  },
  'network-monitoring': {
    id: 'network-monitoring',
    name: 'Network Monitoring Tool',
    category: 'Software & Services',
    description: 'Real-time network analytics and anomaly detection.',
    longDescription: 'Gain complete visibility into your network with our Network Monitoring Tool. Powered by ML-based anomaly detection, it identifies threats in real-time and integrates with your existing security stack via our open API.',
    specs: [
      { label: 'Monitoring', value: 'Real-time, sub-second alerts' },
      { label: 'Data Retention', value: '90 days' },
      { label: 'Integrations', value: 'Splunk, QRadar, Elastic SIEM' },
      { label: 'Deployment', value: 'Cloud or on-premise' },
      { label: 'API', value: 'REST API included' },
      { label: 'Support', value: '24/7 SOC integration' },
    ],
    useCases: [
      'SOC monitoring and operations',
      'Compliance network logging',
      'Incident response support',
      'Capacity planning and optimization',
    ],
    tags: ['Monitoring', 'Analytics', 'Real-time'],
  },
  'cloud-security-bundle': {
    id: 'cloud-security-bundle',
    name: 'Cloud Security Bundle',
    category: 'Software & Services',
    description: 'Multi-cloud security management platform.',
    longDescription: 'Unify your cloud security across AWS, Azure, and Google Cloud with our Cloud Security Bundle. Enforce consistent policies, detect misconfigurations, and automate compliance reporting across all your cloud environments from a single console.',
    specs: [
      { label: 'Cloud Providers', value: 'AWS, Azure, GCP' },
      { label: 'Policy Engine', value: 'Unified cross-cloud policies' },
      { label: 'Compliance', value: 'CIS Benchmarks, ISO 27001, GDPR' },
      { label: 'Auto-remediation', value: 'Yes, configurable' },
      { label: 'Deployment', value: 'SaaS' },
      { label: 'Reporting', value: 'Executive and technical reports' },
    ],
    useCases: [
      'Multi-cloud security governance',
      'Cloud compliance auditing',
      'DevSecOps pipeline integration',
      'Cloud cost and security optimization',
    ],
    tags: ['Cloud', 'Multi-cloud', 'Compliance'],
  },
  'compliance-audit': {
    id: 'compliance-audit',
    name: 'Compliance Audit Package',
    category: 'Consulting Packages',
    description: 'Regulatory compliance assessment and gap analysis.',
    longDescription: "Our Compliance Audit Package delivers a comprehensive assessment of your organization's compliance posture against major regulatory frameworks. Our certified auditors conduct thorough reviews, identify gaps, and provide a prioritized remediation roadmap.",
    specs: [
      { label: 'Frameworks', value: 'ISO 27001, PDPA, GDPR, PCI DSS' },
      { label: 'Methodology', value: 'NIST Cybersecurity Framework' },
      { label: 'Duration', value: '2–4 weeks (depending on scope)' },
      { label: 'Deliverables', value: 'Gap analysis report + roadmap' },
      { label: 'Follow-up', value: '1 executive briefing session' },
      { label: 'Team', value: 'Certified auditors (CISA, CISM)' },
    ],
    useCases: [
      'Pre-certification ISO 27001 assessment',
      'PDPA/GDPR readiness review',
      'Post-incident compliance review',
      'Annual security posture assessment',
    ],
    tags: ['Compliance', 'ISO 27001', 'GDPR', 'Audit'],
  },
  'data-backup': {
    id: 'data-backup',
    name: 'Data Backup Solution',
    category: 'Consulting Packages',
    description: 'Automated cloud backup and disaster recovery system.',
    longDescription: 'Protect your most critical data with our automated Data Backup Solution. Encrypted, geo-redundant cloud storage with granular recovery options ensures your organization can recover from ransomware, hardware failure, or natural disasters with minimal downtime.',
    specs: [
      { label: 'Backup Frequency', value: 'Continuous or scheduled' },
      { label: 'Encryption', value: 'AES-256 at rest and in transit' },
      { label: 'Versioning', value: '30-day version history' },
      { label: 'RTO', value: '< 4 hours' },
      { label: 'RPO', value: '< 1 hour' },
      { label: 'Storage', value: 'Geo-redundant cloud storage' },
    ],
    useCases: [
      'Ransomware recovery planning',
      'Business continuity for critical systems',
      'Compliance data retention requirements',
      'Remote workforce data protection',
    ],
    tags: ['Backup', 'Disaster Recovery', 'Cloud'],
  },
};

function ProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const product = products[id];
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, category: product.category, description: product.description });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link href="/shop" className="text-cyan-600 hover:text-cyan-500 font-semibold">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <Link href="/shop" className="hover:text-cyan-600 transition-colors">Shop</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/shop/products" className="hover:text-cyan-600 transition-colors">Products</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Product Info */}
          <div className="lg:col-span-2 space-y-10">
            <div className="animate-fadeInUp">
              <div className="badge mb-4">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 tracking-tight">{product.name}</h1>
              <p className="text-gray-500 text-lg leading-relaxed">{product.longDescription}</p>
            </div>

            {/* Specs */}
            <div className="animate-fadeInUp delay-100">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Technical Specifications</h2>
              <div className="card overflow-hidden !rounded-2xl">
                {product.specs.map((spec, i) => (
                  <div key={spec.label} className={`flex items-center px-6 py-4 ${i % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'}`}>
                    <span className="w-1/2 text-sm font-semibold text-gray-700">{spec.label}</span>
                    <span className="w-1/2 text-sm text-gray-500">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="animate-fadeInUp delay-200">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Ideal For</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.useCases.map((useCase) => (
                  <div key={useCase} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-600 text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-7 sticky top-24 !rounded-2xl animate-slideRight">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Interested in this product?</h3>
              <p className="text-gray-500 text-sm mb-7 leading-relaxed">Add it to your quote cart and our team will prepare a customized proposal for your organization.</p>
              <button
                onClick={handleAdd}
                id="product-add-to-cart"
                className={`w-full font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 mb-3 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'btn-primary !w-full !rounded-xl'
                }`}
              >
                {added ? '✓ Added to Quote Cart' : 'Add to Quote Cart'}
              </button>
              <Link href="/contact" className="block text-center border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm">
                Contact Us Directly
              </Link>
              <div className="mt-7 pt-7 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDescriptionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse text-gray-400 font-medium">Loading product...</div>
      </div>
    }>
      <ProductContent />
    </Suspense>
  );
}
