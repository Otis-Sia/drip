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
  const { addItem } = useCart();

  const filtered = allProducts.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-cyan-300 font-semibold text-sm uppercase tracking-wide mb-2">Product Catalog</div>
          <h1 className="text-3xl md:text-4xl font-black mb-4">All Products</h1>
          <p className="text-blue-100">Browse and request quotes for our cybersecurity solutions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-blue-800 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all flex flex-col overflow-hidden">
              <div className="p-6 flex-1">
                <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-3 inline-block">{product.category}</div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <ul className="space-y-1 mb-4">
                  {product.features.map(f => (
                    <li key={f} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-cyan-600 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 pt-0 space-y-2">
                <Link href={`/shop/product-description?id=${product.id}`} className="block text-center border border-blue-700 text-blue-700 hover:bg-blue-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  View Details
                </Link>
                <button
                  onClick={() => addItem({ id: product.id, name: product.name, category: product.category, description: product.description })}
                  className="w-full bg-blue-800 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Add to Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="mt-4 text-blue-700 font-medium hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
