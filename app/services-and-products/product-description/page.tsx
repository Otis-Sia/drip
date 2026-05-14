'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useState, useEffect } from 'react';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';
import { type Product, getCategories, getAllProducts } from '@/lib/products';

function ProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [products, categories] = await Promise.all([
          getAllProducts(),
          getCategories()
        ]);
        
        const found = products.find(p => p.id === id);
        setProduct(found || null);
        
        const catMap = Object.fromEntries(categories.map(c => [c.id, c.title]));
        setCategoryMap(catMap);
      } catch (error) {
        console.error('Error loading product details:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse text-gray-400 font-medium">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="mb-4">
            <Image src="/search.svg" alt="Not found" width={48} height={48} className="mx-auto opacity-40" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link href="/services-and-products" className="text-primary hover:brightness-90 font-semibold transition-all">Back to Services and Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/services-and-products" className="hover:text-primary transition-colors">Services & Products</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-fg">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Product Gallery & Info */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <div className="animate-fadeInUp">
              <div className="relative w-full aspect-[16/10] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm mb-6">
                <Image 
                  src={product.image || 'https://placehold.co/800x500/8FBB43/white?text=Product+Image'} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                  priority
                />
              </div>
              
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, i) => (
                    <div key={i} className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/50 transition-all cursor-pointer group">
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="animate-fadeInUp">
              <div className="badge mb-4">{categoryMap[product.category] || product.category}</div>
              <h1 className="text-3xl md:text-4xl font-black text-fg mb-5 tracking-tight">{product.name}</h1>
              <p className="text-muted text-lg leading-relaxed">{product.longDescription}</p>
            </div>

            {/* Specs */}
            <div className="animate-fadeInUp delay-100">
              <h2 className="text-xl font-bold text-fg mb-5">Technical Specifications</h2>
              <div className="card overflow-hidden !rounded-2xl">
                {product.specs.map((spec, i) => (
                  <div key={`${spec.label}-${i}`} className={`flex items-center px-6 py-4 ${i % 2 === 0 ? 'bg-surface-alt' : 'bg-surface'}`}>
                    <span className="w-1/2 text-sm font-semibold text-fg/80">{spec.label}</span>
                    <span className="w-1/2 text-sm text-muted">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="animate-fadeInUp delay-200">
              <h2 className="text-xl font-bold text-fg mb-5">Ideal For</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.useCases.map((useCase, i) => (
                  <div key={`${useCase}-${i}`} className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-border">
                    <CheckCircleIcon size={20} className="text-primary" />
                    <span className="text-muted text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-7 sticky top-24 !rounded-2xl animate-slideRight">
              <h3 className="font-bold text-fg text-lg mb-2">Interested in this Product?</h3>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Our experts can help you select the right products for your specific farming needs. Contact us today for a consultation.
              </p>
              
              <Link href="#main-footer" className="block text-center btn-primary font-semibold px-6 py-4 rounded-xl transition-all duration-300 text-base mb-4">
                Request a Quote
              </Link>
              
              <div className="mt-7 pt-7 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Product Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag, i) => (
                    <span key={`${tag}-${i}`} className="badge-tag">{tag}</span>
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

export default function ServicesProductDescriptionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse text-gray-400 font-medium">Loading product details...</div>
      </div>
    }>
      <ProductContent />
    </Suspense>
  );
}
