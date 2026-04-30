'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { Suspense, useState } from 'react';

const products: Record<string, {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  specs: { label: string; value: string }[];
  useCases: string[];
  tags: string[];
}> = {
  'uv-greenhouse-polythene': {
    id: 'uv-greenhouse-polythene',
    name: 'Greenhouse Polythene (UV Open/Blocked)',
    category: 'Greenhouse Materials',
    description: 'High-quality, durable polythene designed to optimize light transmission and protect crops from harsh weather.',
    longDescription: 'Our premium Greenhouse Polythene provides the ideal controlled environment for your crops. Available in UV Open and UV Blocked variants, it ensures optimal light diffusion, thermal efficiency, and long-lasting durability against severe weather conditions.',
    specs: [
      { label: 'Thickness', value: '200µm (microns)' },
      { label: 'Type', value: 'UV Open / UV Blocked available' },
      { label: 'Width', value: 'Standard 8m, 10m (custom available)' },
      { label: 'Length', value: '100m / 200m per roll' },
      { label: 'Transparency', value: '88% - 90% light transmission' },
      { label: 'Color', value: 'Clear, Yellow, Diffused' },
      { label: 'UV Lifespan', value: '3 - 5 years' },
      { label: 'Application', value: 'Roofing and side covering' },
    ],
    useCases: [
      'Commercial tomato and capsicum farming',
      'Flower nurseries and propagation',
      'Controlled environment agriculture',
    ],
    tags: ['UV Treated', 'Durable', '200 Microns'],
  },
  'locking-profiles': {
    id: 'locking-profiles',
    name: 'Locking Profiles (2m, 4m)',
    category: 'Greenhouse Materials',
    description: 'Galvanized steel locking profiles and zigzag wires for securely fastening polythene.',
    longDescription: 'Ensure your greenhouse polythene and nets stay firmly in place with our heavy-duty locking profiles. Designed to withstand high winds without tearing the plastic, these profiles provide a secure, easily adjustable fastening system.',
    specs: [
      { label: 'Length', value: '2m, 4m sections' },
      { label: 'Material', value: 'Galvanized steel / Aluminum' },
      { label: 'Compatibility', value: 'All polythene and shade nets' },
      { label: 'Thickness', value: '0.8mm - 1.2mm gauge' },
      { label: 'Finish', value: 'Hot-dip galvanized' },
      { label: 'Application', value: 'Greenhouse frame fastening' },
    ],
    useCases: [
      'Greenhouse construction and repair',
      'Shade net house assembly',
      'Securing side ventilation screens',
    ],
    tags: ['Galvanized', 'Secure', 'Accessories'],
  },
  'tapping-screws': {
    id: 'tapping-screws',
    name: 'Tapping Screws',
    category: 'Greenhouse Materials',
    description: 'High-strength tapping screws for fast and secure greenhouse assembly.',
    longDescription: 'Our self-tapping screws are specially designed for the rapid assembly of greenhouse structures. With advanced anti-rust coatings, they guarantee structural integrity in high-humidity agricultural environments.',
    specs: [
      { label: 'Length', value: '16mm - 32mm' },
      { label: 'Diameter', value: '4.8mm - 5.5mm' },
      { label: 'Material', value: 'Galvanized / Stainless Steel' },
      { label: 'Head Type', value: 'Hex head with EPDM washer' },
      { label: 'Coating', value: 'Anti-rust zinc coating' },
      { label: 'Application', value: 'Frame assembly, profile fixing' },
    ],
    useCases: [
      'Fastening locking profiles to pipes',
      'General greenhouse frame construction',
      'Repairing and reinforcing structures',
    ],
    tags: ['Fasteners', 'Anti-Rust', 'Assembly'],
  },
  'drip-lines': {
    id: 'drip-lines',
    name: 'Driplines (0.3mm, 0.4mm)',
    category: 'Irrigation Systems',
    description: 'Precision emitter driplines for highly efficient, localized water delivery.',
    longDescription: 'Maximize your water efficiency with our premium driplines. Featuring advanced anti-clogging emitters, they deliver water and nutrients directly to the root zone, ensuring uniform crop growth and significantly reduced water wastage.',
    specs: [
      { label: 'Diameter', value: '16mm standard' },
      { label: 'Wall Thickness', value: '0.3mm, 0.4mm, 0.9mm' },
      { label: 'Emitter Spacing', value: '15cm, 20cm, 30cm, 40cm' },
      { label: 'Flow Rate', value: '1.2 L/hr - 2.0 L/hr' },
      { label: 'Length', value: '1000m / 3000m rolls' },
      { label: 'Pressure Rating', value: '0.8 - 1.2 Bar' },
      { label: 'Material', value: 'High-grade PE' },
    ],
    useCases: [
      'Row crops (tomatoes, onions, cabbages)',
      'Greenhouse drip irrigation',
      'Orchards and fruit trees',
    ],
    tags: ['Water Efficient', 'Anti-clogging', 'Irrigation'],
  },
  'irrigation-pipes': {
    id: 'irrigation-pipes',
    name: 'Irrigation Pipes',
    category: 'Irrigation Systems',
    description: 'Durable PVC and HDPE pipes for reliable agricultural water transport.',
    longDescription: 'Build a robust water delivery network with our high-quality irrigation pipes. Available in various pressure ratings and diameters, they form the reliable backbone of both open-field and greenhouse irrigation systems.',
    specs: [
      { label: 'Diameter', value: '20mm - 110mm (1/2" to 4")' },
      { label: 'Length', value: '6m pieces / 100m coils' },
      { label: 'Pressure Rating', value: 'PN6, PN8, PN10' },
      { label: 'Material', value: 'HDPE, PVC' },
      { label: 'Wall Thickness', value: 'Depends on PN class' },
      { label: 'Color', value: 'Black (HDPE), Grey (PVC)' },
      { label: 'Application', value: 'Mainline and sub-main distribution' },
    ],
    useCases: [
      'Transporting water from dam to field',
      'Sub-main lines for drip tape connection',
      'Sprinkler system mainlines',
    ],
    tags: ['Mainline', 'Durable', 'Piping'],
  },
  'pipe-fittings': {
    id: 'pipe-fittings',
    name: 'Pipe Fittings & Valves',
    category: 'Irrigation Systems',
    description: 'A complete range of fittings and valves for building seamless irrigation networks.',
    longDescription: 'Connect, control, and configure your irrigation layout with our extensive range of pipe fittings. From simple elbows to high-pressure gate valves, our fittings ensure leak-proof connections and precise flow control.',
    specs: [
      { label: 'Type', value: 'Elbow, Tee, Connector, Valve, End Cap' },
      { label: 'Diameter', value: '16mm - 110mm' },
      { label: 'Material', value: 'PVC, HDPE, PP' },
      { label: 'Pressure Rating', value: 'Up to PN16' },
      { label: 'Thread Type', value: 'Male / Female BSP' },
      { label: 'Application', value: 'System connection and flow control' },
    ],
    useCases: [
      'Branching mainlines into sub-mains',
      'Controlling water flow to specific zones',
      'Connecting drip lines to PVC pipes',
    ],
    tags: ['Valves', 'Connectors', 'Leak-proof'],
  },
  'hdpe-pipes': {
    id: 'hdpe-pipes',
    name: 'HDPE Pipes & Fittings',
    category: 'Water Management',
    description: 'High-density polyethylene pipes for durable and leak-proof mainlines.',
    longDescription: 'Our HDPE pipes offer unparalleled durability and flexibility for long-distance water transport. Highly resistant to UV rays, chemicals, and physical impact, they are the industry standard for reliable agricultural water supply.',
    specs: [
      { label: 'Diameter', value: '20mm - 250mm' },
      { label: 'Length', value: '6m, 12m lengths / 50m, 100m coils' },
      { label: 'Pressure Rating', value: 'PN6, PN10, PN12.5, PN16' },
      { label: 'SDR Rating', value: 'SDR 11 to SDR 26' },
      { label: 'Material', value: 'PE100 / PE80 Grade' },
      { label: 'Color', value: 'Black with blue stripes' },
      { label: 'Application', value: 'High-pressure water transport' },
    ],
    useCases: [
      'Borehole water extraction',
      'Large-scale farm water reticulation',
      'Underground irrigation mainlines',
    ],
    tags: ['Heavy Duty', 'UV Resistant', 'HDPE'],
  },
  'dam-liners': {
    id: 'dam-liners',
    name: 'Dam Liners (0.3mm to 1mm)',
    category: 'Water Management',
    description: 'Premium geomembrane liners for constructing water reservoirs and conservation tanks.',
    longDescription: 'Secure your water supply with our heavy-duty dam liners. Engineered for maximum puncture resistance and UV stability, these liners provide a reliable, long-term waterproofing solution for agricultural water storage.',
    specs: [
      { label: 'Thickness', value: '0.3mm, 0.5mm, 0.75mm, 1.0mm' },
      { label: 'Material', value: 'High-Density Polyethylene (HDPE)' },
      { label: 'Width', value: 'Standard 8m (welded to custom size)' },
      { label: 'Length', value: 'Custom per project requirement' },
      { label: 'UV Resistance', value: 'High UV stabilization' },
      { label: 'Puncture Resistance', value: 'High tensile strength' },
      { label: 'Application', value: 'Water storage ponds, fish ponds' },
    ],
    useCases: [
      'Lining agricultural water reservoirs',
      'Constructing elevated water tanks',
      'Aquaculture and fish farming ponds',
    ],
    tags: ['Waterproofing', 'Tear Resistant', 'Storage'],
  },
  'shade-nets': {
    id: 'shade-nets',
    name: 'Agricultural Nets (Shade, Bird, Insect)',
    category: 'Nets & Crop Protection',
    description: 'Knitted agricultural nets to protect crops from intense sunlight, pests, and birds.',
    longDescription: 'Create the perfect micro-climate and protect your yields with our versatile range of agricultural nets. Whether you need to reduce heat stress, keep out destructive birds, or exclude microscopic pests, we have the specialized netting required.',
    specs: [
      { label: 'Type', value: 'Shade Net / Bird Net / Insect Net' },
      { label: 'Shade Percentage', value: '30%, 50%, 75%, 90%' },
      { label: 'Mesh Size', value: 'Varies (e.g., 40-mesh for insects)' },
      { label: 'Dimensions', value: 'Standard 4m x 50m rolls' },
      { label: 'Color', value: 'Green, Black, White' },
      { label: 'Material', value: 'UV Stabilized HDPE' },
      { label: 'Application', value: 'Crop protection and climate control' },
    ],
    useCases: [
      'Protecting seedlings in nurseries (Shade)',
      'Excluding whiteflies and aphids (Insect)',
      'Protecting fruit orchards (Bird)',
    ],
    tags: ['UV Stabilized', 'Pest Control', 'Protection'],
  },
  'mulch-films': {
    id: 'mulch-films',
    name: 'Agricultural Mulch Films',
    category: 'Crop Enhancement Materials',
    description: 'Plastic mulch films that suppress weed growth and conserve soil moisture.',
    longDescription: 'Improve crop yields and reduce labor costs with our agricultural mulch films. By blocking sunlight to weeds, retaining soil moisture, and regulating root zone temperature, mulch films provide an optimal growing environment.',
    specs: [
      { label: 'Thickness', value: '25µm - 50µm (microns)' },
      { label: 'Width', value: '1m, 1.2m, 1.5m' },
      { label: 'Length', value: '400m / 1000m rolls' },
      { label: 'Color', value: 'Black, Silver/Black, Transparent' },
      { label: 'UV Resistance', value: 'Stabilized for 1-2 seasons' },
      { label: 'Application', value: 'Weed control, moisture retention' },
    ],
    useCases: [
      'Open-field tomato and melon farming',
      'Strawberry cultivation',
      'Reducing irrigation frequency',
    ],
    tags: ['Weed Control', 'Moisture Retention'],
  },
  'greenhouse-accessories': {
    id: 'greenhouse-accessories',
    name: 'General Greenhouse Accessories',
    category: 'Greenhouse Materials',
    description: 'Clips, fasteners, and support systems for greenhouse optimization.',
    longDescription: 'Complete your greenhouse setup with our range of high-quality accessories. From crop support twines to repair tapes, we supply the small but essential components that keep your operations running smoothly.',
    specs: [
      { label: 'Type', value: 'Tomato clips, support twine, repair tape' },
      { label: 'Material', value: 'UV treated plastics, heavy-duty adhesive' },
      { label: 'Compatibility', value: 'Standard greenhouse setups' },
      { label: 'Application', value: 'Crop support, structure maintenance' },
    ],
    useCases: [
      'Trellising climbing crops like tomatoes',
      'Patching minor tears in polythene',
      'Securing irrigation lines',
    ],
    tags: ['Accessories', 'Maintenance', 'Support'],
  },
};

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
          <Link href="/shop" className="text-[#63913D] hover:text-[#8FBB43] font-semibold">Back to Shop</Link>
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
              <div className="badge mb-4">{product.category}</div>
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
                    <span className="w-5 h-5 rounded-full bg-[#63913D]/10 text-[#63913D] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
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
                    : 'bg-[#63913D] hover:bg-[#8FBB43] text-white'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
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
