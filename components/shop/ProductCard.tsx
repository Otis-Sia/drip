'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cartContext';
import { useState } from 'react';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';

interface ProductCardProps {
  product: Product;
  showFeatures?: boolean;
}

export default function ProductCard({ product, showFeatures = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      category: product.category, 
      description: product.description 
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card flex flex-col overflow-hidden h-full">
      {/* Product Image */}
      <div className="relative w-full h-44 bg-gradient-to-br from-[#63913D]/5 to-[#8FBB43]/5 overflow-hidden">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#63913D]/30 text-4xl font-black">{product.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1">
        <div className="badge mb-3 w-fit">{product.category}</div>
        <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>
        
        {showFeatures && product.features && (
          <ul className="space-y-2 mb-4">
            {product.features.map((f) => (
              <li key={f} className="text-xs text-gray-500 flex items-start gap-2">
                <CheckCircleIcon size={16} />
                {f}
              </li>
            ))}
          </ul>
        )}

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
          onClick={handleAdd}
          className={`w-full text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${
            added
              ? 'bg-[#8FBB43] text-white'
              : 'btn-secondary !w-full !text-sm'
          }`}
        >
          {added ? (
            <span className="flex items-center justify-center gap-1.5">
              <CheckCircleIcon size={14} color="white" />
              Added to Cart
            </span>
          ) : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
