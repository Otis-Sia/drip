import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { categories, allProducts } from '@/lib/products';
import CategoryCard from '@/components/shop/CategoryCard';
import ProductCard from '@/components/shop/ProductCard';

export const metadata: Metadata = {
  title: 'Shop | Afrodrip Limited',
  description: "Browse Afrodrip's agricultural products and solutions. Request a quote for any product.",
};

export default function ShopPage() {
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-[#8FBB43] !text-white border-none mb-6 backdrop-blur-sm shadow-lg shadow-green-900/20 mx-auto">Product Catalog</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Agricultural Solutions for Every Need</h1>
          <p className="text-white max-w-2xl mx-auto text-lg mb-10 font-light animate-fadeInUp delay-100">
            Browse our curated catalog of greenhouse, irrigation, and farming products. All products are available via quote request.
          </p>
          <Link href="/shop/products" className="btn-primary !px-10 !py-3.5 text-base animate-fadeInUp delay-200" id="shop-browse-all">
            Browse All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label">Categories</div>
            <h2 className="section-title mx-auto">Product Categories</h2>
            <p className="section-subtitle mx-auto">Explore our solutions by category</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="section-title !mb-2">Featured Products</h2>
              <p className="text-gray-500">{allProducts.length} products available</p>
            </div>
            <Link href="/shop/products" className="btn-outline-dark !text-sm !py-2.5 !px-5" id="shop-view-filters">
              View All with Filters
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Info */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { icon: '/clipboard.svg', title: 'Request a Quote', desc: 'Add products to your cart and submit a request. Our team will respond within 24 hours.' },
              { icon: '/handshake.svg', title: 'Custom Solutions', desc: 'Need something specific? We tailor every solution to your exact requirements.' },
              { icon: '/lightning.svg', title: 'Fast Response', desc: 'Our sales team is available Mon–Fri 8am–6pm PHT to assist with your inquiries.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-2xl glass-icon flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Image src={item.icon} alt="" width={32} height={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
