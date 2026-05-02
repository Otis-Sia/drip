import productsData from '../lib/data/products.json';
import { categoryMap, reverseCategoryMap } from '../lib/products';

// Data from app/shop/product-description/page.tsx
const richProducts = {
  'uv-greenhouse-polythene': {
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
  },
  'locking-profiles': {
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
  },
  'drip-lines': {
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
  },
  'hdpe-pipes': {
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
  },
  'dam-liners': {
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
  },
  'shade-nets': {
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
  },
  'mulch-films': {
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
  },
};

const mergedProducts = productsData.map(p => {
  const rich = richProducts[p.id] || {};
  return {
    ...p,
    longDescription: rich.longDescription || p.description,
    specs: rich.specs || [],
    useCases: rich.useCases || []
  };
});

console.log(JSON.stringify(mergedProducts, null, 2));
