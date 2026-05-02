import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/products';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/shop/products?category=${category.id}`}
      id={`shop-cat-${category.id}`}
      className="card overflow-hidden group"
    >
      {/* Category Image */}
      {category.image && (
        <div className="relative w-full h-36 overflow-hidden">
          <Image src={category.image} alt={category.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" />
        </div>
      )}
      <div className="p-7">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <Image src={category.icon} alt="" width={32} height={32} />
        </div>
      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#63913D] transition-colors">
        {category.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed">
        {category.description}
      </p>
      <span className="text-[#63913D] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
        {category.count} products
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
      </div>
    </Link>
  );
}
