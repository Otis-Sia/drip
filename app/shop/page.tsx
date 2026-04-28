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
  },
  {
    id: 'training',
    title: 'Training & Education',
    icon: '📚',
    description: 'Comprehensive cybersecurity and digital literacy training packages.',
    count: 2,
  },
  {
    id: 'software',
    title: 'Software & Services',
    icon: '💻',
    description: 'Software licenses, monitoring tools, and managed security services.',
    count: 2,
  },
  {
    id: 'consulting',
    title: 'Consulting Packages',
    icon: '🎯',
    description: 'Expert consulting engagements for security assessments and compliance.',
    count: 2,
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
      <section className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide mb-3">Product Catalog</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Security Solutions for Every Need</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg mb-8">
            Browse our curated catalog of cybersecurity products and solutions. All products are available via quote request.
          </p>
          <Link href="/shop/products" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block">
            Browse All Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-gray-600">Explore our solutions by category</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <Link key={cat.id} href={`/shop/products?category=${cat.id}`} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all group">
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-800">{cat.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{cat.description}</p>
                <span className="text-blue-700 text-sm font-medium">{cat.count} products →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
              <p className="text-gray-600 mt-1">{featuredProducts.length} products available</p>
            </div>
            <Link href="/shop/products" className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
              View with Filters
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all flex flex-col">
                <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-4 inline-block w-fit">{product.category}</div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <Link href={`/shop/product-description?id=${product.id}`} className="bg-blue-800 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors text-center block">
                  Request Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Info */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '📋', title: 'Request a Quote', desc: 'Add products to your quote cart and submit a request. Our team will respond within 24 hours.' },
              { icon: '🤝', title: 'Custom Solutions', desc: 'Need something specific? We tailor every solution to your exact requirements.' },
              { icon: '⚡', title: 'Fast Response', desc: 'Our sales team is available Mon–Fri 8am–6pm PHT to assist with your inquiries.' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center">
                <span className="text-4xl mb-3">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
