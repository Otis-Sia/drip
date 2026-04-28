import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | DRIP',
  description: "Browse DRIP's cybersecurity products and solutions. Request a quote for any product.",
};

const categories = [
  {
    id: 'hardware',
    title: 'Hardware Solutions',
    icon: '🖥️',
    description: 'Physical security devices and network protection hardware for your infrastructure.',
    count: 2,
    gradient: 'from-cyan-50 to-blue-50',
  },
  {
    id: 'training',
    title: 'Training & Education',
    icon: '📚',
    description: 'Comprehensive cybersecurity and digital literacy training packages.',
    count: 2,
    gradient: 'from-amber-50 to-orange-50',
  },
  {
    id: 'software',
    title: 'Software & Services',
    icon: '💻',
    description: 'Software licenses, monitoring tools, and managed security services.',
    count: 2,
    gradient: 'from-indigo-50 to-purple-50',
  },
  {
    id: 'consulting',
    title: 'Consulting Packages',
    icon: '🎯',
    description: 'Expert consulting engagements for security assessments and compliance.',
    count: 2,
    gradient: 'from-emerald-50 to-teal-50',
  },
];

const featuredProducts = [
  {
    id: 'cybersecurity-starter-kit',
    name: 'Cybersecurity Starter Kit',
    category: 'Hardware Solutions',
    description: 'A complete security hardware bundle designed for small and medium-sized businesses. Includes firewall appliance, managed switch, and endpoint protection.',
    tags: ['Firewall', 'SMB', 'Hardware'],
  },
  {
    id: 'enterprise-firewall',
    name: 'Enterprise Firewall System',
    category: 'Hardware Solutions',
    description: 'Advanced next-generation firewall with deep packet inspection, IDS/IPS, and centralized management for enterprise environments.',
    tags: ['Enterprise', 'NGFW', 'Network Security'],
  },
  {
    id: 'digital-training-package',
    name: 'Digital Training Package',
    category: 'Training & Education',
    description: 'A comprehensive online cybersecurity training suite with self-paced modules, assessments, and certification prep for your entire team.',
    tags: ['Online', 'Certification', 'Team Training'],
  },
  {
    id: 'security-awareness-training',
    name: 'Security Awareness Training',
    category: 'Training & Education',
    description: 'Automated phishing simulation platform with employee training modules and management dashboard for continuous security awareness.',
    tags: ['Phishing', 'Awareness', 'Simulation'],
  },
  {
    id: 'network-monitoring',
    name: 'Network Monitoring Tool',
    category: 'Software & Services',
    description: 'Real-time network analytics and anomaly detection platform with customizable dashboards and automated alerting.',
    tags: ['Monitoring', 'Analytics', 'Real-time'],
  },
  {
    id: 'cloud-security-bundle',
    name: 'Cloud Security Bundle',
    category: 'Software & Services',
    description: 'Multi-cloud security management platform covering AWS, Azure, and GCP with unified policy enforcement and compliance monitoring.',
    tags: ['Cloud', 'Multi-cloud', 'Compliance'],
  },
  {
    id: 'compliance-audit',
    name: 'Compliance Audit Package',
    category: 'Consulting Packages',
    description: 'Comprehensive regulatory compliance assessment covering ISO 27001, PDPA, GDPR, and industry-specific requirements.',
    tags: ['Compliance', 'ISO 27001', 'GDPR'],
  },
  {
    id: 'data-backup',
    name: 'Data Backup Solution',
    category: 'Consulting Packages',
    description: 'Automated cloud backup and disaster recovery system with encrypted storage, versioning, and one-click restoration.',
    tags: ['Backup', 'Disaster Recovery', 'Cloud'],
  },
];

export default function ShopPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge bg-white/10 text-cyan-300 border border-cyan-400/20 mb-6 backdrop-blur-sm mx-auto">Product Catalog</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Security Solutions for Every Need</h1>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-lg mb-10 font-light animate-fadeInUp delay-100">
            Browse our curated catalog of cybersecurity products and solutions. All products are available via quote request.
          </p>
          <Link href="/shop/products" className="btn-primary !px-10 !py-3.5 text-base animate-fadeInUp delay-200" id="shop-browse-all">
            Browse All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">Categories</div>
            <h2 className="section-title mx-auto">Product Categories</h2>
            <p className="section-subtitle mx-auto">Explore our solutions by category</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/products?category=${cat.id}`}
                id={`shop-cat-${cat.id}`}
                className="card p-7 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#1e3a5f] transition-colors">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{cat.description}</p>
                <span className="text-cyan-600 text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  {cat.count} products
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="section-title !mb-2">All Products</h2>
              <p className="text-gray-500">{featuredProducts.length} products available</p>
            </div>
            <Link href="/shop/products" className="btn-outline-dark !text-sm !py-2.5 !px-5" id="shop-view-filters">
              View with Filters
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card p-6 flex flex-col">
                <div className="badge mb-4 w-fit">{product.category}</div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge-tag">{tag}</span>
                  ))}
                </div>
                <Link
                  href={`/shop/product-description?id=${product.id}`}
                  className="btn-secondary block text-center !text-sm !py-2.5"
                  id={`shop-product-${product.id}`}
                >
                  Request Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Info */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { icon: '📋', title: 'Request a Quote', desc: 'Add products to your quote cart and submit a request. Our team will respond within 24 hours.' },
              { icon: '🤝', title: 'Custom Solutions', desc: 'Need something specific? We tailor every solution to your exact requirements.' },
              { icon: '⚡', title: 'Fast Response', desc: 'Our sales team is available Mon–Fri 8am–6pm PHT to assist with your inquiries.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
