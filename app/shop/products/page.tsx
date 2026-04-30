'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';

const allProducts = [
  {
    id: 'uv-greenhouse-polythene',
    name: 'Greenhouse Polythene (UV Open/Blocked)',
    category: 'Greenhouse Materials',
    description: 'High-quality, durable polythene designed to optimize light transmission and protect crops from harsh weather.',
    tags: ['UV Treated', 'Durable', '200 Microns'],
    features: ['Optimal light transmission', 'Excellent heat retention', 'Tear and weather resistant', 'Long lifespan (3+ years)'],
  },
  {
    id: 'locking-profiles',
    name: 'Locking Profiles (2m, 4m)',
    category: 'Greenhouse Materials',
    description: 'Galvanized steel locking profiles and zigzag wires for securely fastening polythene and nets to greenhouse structures.',
    tags: ['Galvanized', 'Secure', 'Accessories'],
    features: ['Corrosion resistant galvanized steel', 'Durable PVC coated zigzag wire', 'Easy to install and remove', 'Multiple length options'],
  },
  {
    id: 'drip-lines',
    name: 'Driplines (0.3mm, 0.4mm)',
    category: 'Irrigation Systems',
    description: 'Precision emitter driplines for highly efficient, localized water delivery directly to the root zone.',
    tags: ['Water Efficient', 'Anti-clogging'],
    features: ['Consistent flow rate', 'High clogging resistance', 'Even water distribution', 'Easy to deploy'],
  },
  {
    id: 'hdpe-pipes',
    name: 'HDPE Pipes & Fittings',
    category: 'Irrigation Systems',
    description: 'High-density polyethylene pipes for durable and leak-proof mainlines and submains in irrigation setups.',
    tags: ['Heavy Duty', 'UV Resistant'],
    features: ['Withstands high pressure', 'Durable and long-lasting', 'Corrosion and chemical resistant', 'Compatible with standard fittings'],
  },
  {
    id: 'dam-liners',
    name: 'Dam Liners (0.3mm to 1mm)',
    category: 'Water Management',
    description: 'Premium geomembrane liners for constructing water reservoirs, fish ponds, and conservation tanks.',
    tags: ['Waterproofing', 'Tear Resistant'],
    features: ['High puncture resistance', 'UV stabilized for direct sunlight', 'Custom sizes available', 'Impermeable to water'],
  },
  {
    id: 'shade-nets',
    name: 'Shade Nets',
    category: 'Nets & Crop Protection',
    description: 'Knitted agricultural shade nets available in various percentages to protect crops from intense sunlight and heat stress.',
    tags: ['UV Stabilized', 'Breathable'],
    features: ['Various shade percentages (35%, 55%, 75%)', 'Knitted HDPE material', 'Reduces wind speed', 'Helps retain soil moisture'],
  },
  {
    id: 'insect-nets',
    name: 'Pro Insect Nets',
    category: 'Nets & Crop Protection',
    description: 'Fine mesh netting designed to exclude harmful pests while allowing adequate ventilation and light.',
    tags: ['Pest Control', 'Eco-friendly'],
    features: ['Blocks tiny insects like thrips', 'Excellent ventilation', 'Saves on chemical pesticides', 'Durable construction'],
  },
  {
    id: 'mulch-films',
    name: 'Agricultural Mulch Films',
    category: 'Crop Enhancement Materials',
    description: 'Plastic mulch films that suppress weed growth, conserve soil moisture, and regulate soil temperature for better yields.',
    tags: ['Weed Control', 'Moisture Retention'],
    features: ['Suppresses weed growth', 'Conserves soil moisture', 'Controls soil temperature', 'Prevents soil erosion'],
  },
];

const categories = ['All', 'Greenhouse Materials', 'Irrigation Systems', 'Water Management', 'Nets & Crop Protection', 'Crop Enhancement Materials'];

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
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-4 backdrop-blur-sm">Product Catalog</div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">All Products</h1>
          <p className="text-green-100/70 font-light">Browse and request quotes for our agricultural solutions</p>
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
                    ? 'bg-[#63913D] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8FBB43]/50 hover:text-[#63913D]'
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
                      <span className="w-4 h-4 rounded-full bg-[#63913D]/10 text-[#63913D] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
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
                  className="block text-center border-2 border-[#63913D] text-[#63913D] hover:bg-[#63913D] hover:text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAdd(product)}
                  className={`w-full text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${
                    addedId === product.id
                      ? 'bg-[#8FBB43] text-white'
                      : 'btn-secondary !w-full !text-sm'
                  }`}
                >
                  {addedId === product.id ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Added to Cart
                    </span>
                  ) : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-4 flex justify-center">
              <Image src="/search.svg" alt="" width={48} height={48} className="opacity-40" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No products found matching your criteria.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="text-[#63913D] font-semibold hover:text-[#8FBB43] transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
