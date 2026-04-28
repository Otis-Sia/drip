'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';

const allProducts = [
  {
    id: 'cybersecurity-starter-kit',
    name: 'Cybersecurity Starter Kit',
    category: 'Hardware Solutions',
    description: 'Complete security hardware bundle for SMBs. Includes managed firewall, endpoint protection agents, and a managed switch.',
    tags: ['Firewall', 'SMB', 'Hardware', 'Bundle'],
    features: ['Next-gen firewall appliance', 'Endpoint protection (10 licenses)', 'Managed switch', '1-year support'],
  },
  {
    id: 'enterprise-firewall',
    name: 'Enterprise Firewall System',
    category: 'Hardware Solutions',
    description: 'Advanced next-generation firewall for enterprises with deep packet inspection, IDS/IPS, and centralized management.',
    tags: ['Enterprise', 'NGFW', 'Network Security'],
    features: ['10 Gbps throughput', 'Unified threat management', 'SD-WAN support', 'Centralized console'],
  },
  {
    id: 'digital-training-package',
    name: 'Digital Training Package',
    category: 'Training & Education',
    description: 'Comprehensive online cybersecurity training suite with self-paced modules, assessments, and certification prep.',
    tags: ['Online', 'Certification', 'Team Training'],
    features: ['50+ course modules', 'Certification prep (CISSP, CEH)', 'Progress tracking', 'Bulk licensing'],
  },
  {
    id: 'security-awareness-training',
    name: 'Security Awareness Training',
    category: 'Training & Education',
    description: 'Automated phishing simulation with employee training modules and a management dashboard.',
    tags: ['Phishing', 'Awareness', 'Simulation'],
    features: ['Phishing simulation engine', 'Automated training assignment', 'Management dashboard', 'Risk scoring'],
  },
  {
    id: 'network-monitoring',
    name: 'Network Monitoring Tool',
    category: 'Software & Services',
    description: 'Real-time network analytics and anomaly detection platform with customizable dashboards.',
    tags: ['Monitoring', 'Analytics', 'Real-time'],
    features: ['Real-time threat detection', 'Custom dashboards', 'SIEM integration', 'API access'],
  },
  {
    id: 'cloud-security-bundle',
    name: 'Cloud Security Bundle',
    category: 'Software & Services',
    description: 'Multi-cloud security management platform covering AWS, Azure, and GCP.',
    tags: ['Cloud', 'Multi-cloud', 'Compliance'],
    features: ['AWS, Azure, GCP support', 'Unified policy engine', 'Compliance reporting', 'Auto-remediation'],
  },
  {
    id: 'compliance-audit',
    name: 'Compliance Audit Package',
    category: 'Consulting Packages',
    description: 'Comprehensive regulatory compliance assessment for ISO 27001, PDPA, GDPR, and more.',
    tags: ['Compliance', 'ISO 27001', 'GDPR', 'Audit'],
    features: ['Gap analysis', 'Remediation roadmap', 'Executive report', 'Follow-up session'],
  },
  {
    id: 'data-backup',
    name: 'Data Backup Solution',
    category: 'Consulting Packages',
    description: 'Automated cloud backup and disaster recovery with encrypted storage and one-click restoration.',
    tags: ['Backup', 'Disaster Recovery', 'Cloud'],
    features: ['Automated daily backups', 'AES-256 encryption', 'Versioning (30 days)', 'RTO < 4 hours'],
  },
];

const categories = ['All', 'Hardware Solutions', 'Training & Education', 'Software & Services', 'Consulting Packages'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAdd = (product: typeof allProducts[0]) => {
    addItem({ id: product.id, name: product.name, category: product.category, description: product.description });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filtered = allProducts.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="gradient-hero text-white pt-32 pb-14 md:pt-40 md:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="badge bg-white/10 text-cyan-300 border border-cyan-400/20 mb-4 backdrop-blur-sm">Product Catalog</div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">All Products</h1>
          <p className="text-blue-100/70 font-light">Browse and request quotes for our cybersecurity solutions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="products-search-input"
              className="input-field !pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#1e3a5f] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-cyan-300 hover:text-[#1e3a5f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-8 font-medium">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="card flex flex-col overflow-hidden">
              <div className="p-6 flex-1">
                <div className="badge mb-3 w-fit">{product.category}</div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>
                <ul className="space-y-2 mb-4">
                  {product.features.map((f) => (
                    <li key={f} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 pt-0 space-y-2">
                <Link
                  href={`/shop/product-description?id=${product.id}`}
                  className="block text-center border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAdd(product)}
                  className={`w-full text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${
                    addedId === product.id
                      ? 'bg-emerald-500 text-white'
                      : 'btn-secondary !w-full !text-sm'
                  }`}
                >
                  {addedId === product.id ? '✓ Added to Cart' : 'Add to Quote'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg mb-2">No products found matching your criteria.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="text-cyan-600 font-semibold hover:text-cyan-500 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
