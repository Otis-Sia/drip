'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product, categoryMap } from '@/lib/products';
import { useCart } from '@/lib/cartContext';
import { useState } from 'react';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';

interface ProductCardProps {
  product: Product;
  showFeatures?: boolean;
  showCart?: boolean;
  descriptionPath?: string;
}

export default function ProductCard({ 
  product, 
  showFeatures = false, 
  showCart = true,
  descriptionPath = '/delver/product-description'
}: ProductCardProps) {
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
      <div className="relative w-full h-44 bg-gradient-to-br from-primary/5 to-primary-light/5 overflow-hidden">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary/30 text-4xl font-black">{product.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1">
        <div className="badge mb-3 w-fit">{categoryMap[product.category] || product.category}</div>
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
          href={`${descriptionPath}?id=${product.id}`}
          className="block text-center border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300"
        >
          View Details
        </Link>
        {showCart && (
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
        )}
      </div>
    </div>
  );
}
