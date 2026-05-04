'use client';

import { useState, use, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { allProducts, categoryMap, reverseCategoryMap } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';

const filterCategories = ['All', 'Greenhouse Materials', 'Irrigation Systems', 'Water Management', 'Nets & Crop Protection', 'Crop Enhancement Materials'];

function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const unwrappedSearchParams = use(searchParams);
  const router = useRouter();
  
  const categoryParam = typeof unwrappedSearchParams.category === 'string' 
    ? unwrappedSearchParams.category 
    : 'All';

  const [selectedCategory, setSelectedCategory] = useState(
    categoryMap[categoryParam] || 'All'
  );
  const [search, setSearch] = useState('');

  // Sync state with URL changes
  useEffect(() => {
    const cat = categoryMap[categoryParam] || 'All';
    setSelectedCategory(cat);
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const slug = reverseCategoryMap[cat];
    if (slug) {
      router.push(`/shop/products?category=${slug}`, { scroll: false });
    } else {
      router.push('/shop/products', { scroll: false });
    }
  };

  const filtered = allProducts.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === reverseCategoryMap[selectedCategory];
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="gradient-hero text-white pt-32 pb-14 md:pt-40 md:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20">Product Catalog</div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">All Products</h1>
          <p className="text-green-100/70 font-light">Browse and request quotes for our agricultural solutions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            {/* Search */}
            <div className="relative mb-6">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="products-search-input"
                className="input-field !pl-10 w-full"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Categories</h3>
              <div className="flex flex-col gap-1.5">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-[#63913D]/10 text-[#63913D]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-gray-500 text-sm font-medium">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} showFeatures />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <div className="mb-4 flex justify-center">
                  <Image src="/search.svg" alt="" width={48} height={48} className="opacity-40" />
                </div>
                <p className="text-gray-400 text-lg mb-2">No products found matching your criteria.</p>
                <button
                  onClick={() => { setSearch(''); handleCategoryChange('All'); }}
                  className="text-[#63913D] font-semibold hover:brightness-90 transition-all"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse text-gray-400 font-medium">Loading products...</div>
      </div>
    }>
      <ProductsContent {...props} />
    </Suspense>
  );
}
