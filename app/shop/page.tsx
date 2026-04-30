import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | Afrodrip Limited',
  description: "Browse Afrodrip's agricultural products and solutions. Request a quote for any product.",
};

const categories = [
  {
    id: 'greenhouse-materials',
    title: 'Greenhouse Materials',
    icon: '/green_house.svg',
    description: 'Polythene covers, locking profiles, and structural accessories.',
    count: 3,
    gradient: 'from-[#63913D]/10 to-[#8FBB43]/10',
  },
  {
    id: 'irrigation-systems',
    title: 'Irrigation Systems',
    icon: '/irrigation_systems.svg',
    description: 'Driplines, pipes, and efficient water delivery components.',
    count: 2,
    gradient: 'from-[#57D6F2]/10 to-[#63913D]/10',
  },
  {
    id: 'water-management',
    title: 'Water Management',
    icon: '/water_wave.svg',
    description: 'Heavy-duty dam liners for effective water conservation.',
    count: 1,
    gradient: 'from-[#57D6F2]/10 to-[#8FBB43]/10',
  },
  {
    id: 'nets-crop-protection',
    title: 'Nets & Crop Protection',
    icon: '/protection_net.svg',
    description: 'Shade nets, bird nets, and insect exclusion solutions.',
    count: 3,
    gradient: 'from-lime-50 to-green-50',
  },
  {
    id: 'crop-enhancement',
    title: 'Crop Enhancement Materials',
    icon: '/wheat.svg',
    description: 'Mulch films and other materials to improve crop yield.',
    count: 1,
    gradient: 'from-amber-50 to-orange-50',
  },
];

const featuredProducts = [
  {
    id: 'uv-greenhouse-polythene',
    name: 'Greenhouse Polythene (UV Open/Blocked)',
    category: 'Greenhouse Materials',
    description: 'High-quality, durable polythene designed to optimize light transmission and protect crops from harsh weather.',
    tags: ['UV Treated', 'Durable', '200 Microns'],
  },
  {
    id: 'locking-profiles',
    name: 'Locking Profiles (2m, 4m)',
    category: 'Greenhouse Materials',
    description: 'Galvanized steel locking profiles and zigzag wires for securely fastening polythene and nets to greenhouse structures.',
    tags: ['Galvanized', 'Secure', 'Accessories'],
  },
  {
    id: 'drip-lines',
    name: 'Driplines (0.3mm, 0.4mm)',
    category: 'Irrigation Systems',
    description: 'Precision emitter driplines for highly efficient, localized water delivery directly to the root zone.',
    tags: ['Water Efficient', 'Anti-clogging'],
  },
  {
    id: 'hdpe-pipes',
    name: 'HDPE Pipes & Fittings',
    category: 'Irrigation Systems',
    description: 'High-density polyethylene pipes for durable and leak-proof mainlines and submains in irrigation setups.',
    tags: ['Heavy Duty', 'UV Resistant'],
  },
  {
    id: 'dam-liners',
    name: 'Dam Liners (0.3mm to 1mm)',
    category: 'Water Management',
    description: 'Premium geomembrane liners for constructing water reservoirs, fish ponds, and conservation tanks.',
    tags: ['Waterproofing', 'Tear Resistant'],
  },
  {
    id: 'shade-nets',
    name: 'Shade Nets',
    category: 'Nets & Crop Protection',
    description: 'Knitted agricultural shade nets available in various percentages to protect crops from intense sunlight and heat stress.',
    tags: ['UV Stabilized', 'Breathable'],
  },
  {
    id: 'insect-nets',
    name: 'Pro Insect Nets',
    category: 'Nets & Crop Protection',
    description: 'Fine mesh netting designed to exclude harmful pests while allowing adequate ventilation and light.',
    tags: ['Pest Control', 'Eco-friendly'],
  },
  {
    id: 'mulch-films',
    name: 'Agricultural Mulch Films',
    category: 'Crop Enhancement Materials',
    description: 'Plastic mulch films that suppress weed growth, conserve soil moisture, and regulate soil temperature for better yields.',
    tags: ['Weed Control', 'Moisture Retention'],
  },
];

export default function ShopPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white pt-32 pb-16 md:pt-40 md:pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge !bg-white/20 !text-[#57D6F2] border !border-[#57D6F2]/30 mb-6 backdrop-blur-sm mx-auto">Product Catalog</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fadeInUp">Agricultural Solutions for Every Need</h1>
          <p className="text-green-100/80 max-w-2xl mx-auto text-lg mb-10 font-light animate-fadeInUp delay-100">
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
              <Link
                key={cat.id}
                href={`/shop/products?category=${cat.id}`}
                id={`shop-cat-${cat.id}`}
                className="card p-7 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Image src={cat.icon} alt="" width={32} height={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#63913D] transition-colors">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{cat.description}</p>
                <span className="text-[#63913D] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  {cat.count} products
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="section-title !mb-2">All Products</h2>
              <p className="text-gray-500">{featuredProducts.length} products available</p>
            </div>
            <Link href="/shop/products" className="btn-outline-dark !text-sm !py-2.5 !px-5" id="shop-view-filters">
              View with Filters
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card p-6 flex flex-col">
                <div className="badge mb-4 w-fit">{product.category}</div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge-tag">{tag}</span>
                  ))}
                </div>
                <Link
                  href={`/shop/product-description?id=${product.id}`}
                  className="btn-secondary block text-center !text-sm !py-2.5"
                  id={`shop-product-${product.id}`}
                >
                  Request Quote
                </Link>
              </div>
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#63913D]/10 to-[#8FBB43]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
