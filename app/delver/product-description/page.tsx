'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { Suspense, useState, useEffect } from 'react';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';

import { type Product, getCategories, getAllProducts } from '@/lib/products';

function ProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // RFQ Inputs State
  const [quantity, setQuantity] = useState<number>(1);
  const [customNotes, setCustomNotes] = useState('');

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
        <div className="animate-pulse text-gray-400 font-medium">Loading product...</div>
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
          <Link href="/delver" className="text-primary hover:brightness-90 font-semibold transition-all">Back to Delver</Link>
        </div>
      </div>
    );
  }

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


  return (
    <div className="min-h-screen bg-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <Link href="/delver" className="hover:text-primary transition-colors">Delver</Link>
            <span className="text-gray-400">/</span>
            <Link href="/delver/products" className="hover:text-primary transition-colors">Products</Link>
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
                  <div key={spec.label} className={`flex items-center px-6 py-4 ${i % 2 === 0 ? 'bg-surface-alt' : 'bg-surface'}`}>
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
                {product.useCases.map((useCase) => (
                  <div key={useCase} className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-border">
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
              <h3 className="font-bold text-fg text-lg mb-2">Request a Quote</h3>
              <p className="text-muted text-sm mb-5 leading-relaxed">Please provide project details to help us prepare an accurate proposal.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity / Amount Needed</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-surface-alt border border-border text-fg text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Custom Notes / Specs</label>
                  <textarea 
                    placeholder="Specific requirements..."
                    rows={4}
                    value={customNotes} 
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-surface-alt border border-border text-fg text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleAdd}
                id="product-add-to-cart"
                className={`w-full font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 mb-3 ${
                  added
                    ? 'bg-primary-light text-white'
                    : 'bg-primary hover:brightness-90 text-white'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircleIcon size={18} color="white" />
                    Added to Cart
                  </span>
                ) : 'Add to Cart'}
              </button>
              <Link href="#main-footer" className="block text-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm">
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
