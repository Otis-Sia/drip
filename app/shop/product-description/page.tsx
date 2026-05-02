'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { Suspense, useState } from 'react';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';

import { allProducts, categoryMap } from '@/lib/products';

const products = Object.fromEntries(allProducts.map(p => [p.id, p]));

function ProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const product = products[id];
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // RFQ Inputs State
  const [quantity, setQuantity] = useState<number>(1);
  const [customNotes, setCustomNotes] = useState('');

  const handleAdd = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      category: product.category, 
      description: product.description,
      quantity,
      customNotes
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="mb-4">
            <Image src="/search.svg" alt="Not found" width={48} height={48} className="mx-auto opacity-40" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link href="/shop" className="text-[#63913D] hover:brightness-90 font-semibold transition-all">Back to Shop</Link>
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
            <Link href="/shop" className="hover:text-[#63913D] transition-colors">Shop</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/shop/products" className="hover:text-[#63913D] transition-colors">Products</Link>
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
              <div className="badge mb-4">{categoryMap[product.category] || product.category}</div>
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
                    <CheckCircleIcon size={20} />
                    <span className="text-gray-600 text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-7 sticky top-24 !rounded-2xl animate-slideRight">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Request a Quote</h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">Please provide project details to help us prepare an accurate proposal.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity / Amount Needed</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#8FBB43]/30 focus:border-[#8FBB43] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Custom Notes / Specs</label>
                  <textarea 
                    placeholder="Specific requirements..."
                    rows={4}
                    value={customNotes} 
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#8FBB43]/30 focus:border-[#8FBB43] outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleAdd}
                id="product-add-to-cart"
                className={`w-full font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 mb-3 ${
                  added
                    ? 'bg-[#8FBB43] text-white'
                    : 'bg-[#63913D] hover:brightness-90 text-white'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircleIcon size={18} color="white" />
                    Added to Cart
                  </span>
                ) : 'Add to Cart'}
              </button>
              <Link href="/contact" className="block text-center border-2 border-[#63913D] text-[#63913D] hover:bg-[#63913D] hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm">
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
