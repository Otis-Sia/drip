export interface Product {
  
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  features: string[];
  image?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  count: number;
  gradient: string;
  image?: string;
}

export const categories: Category[] = [
  {
    id: 'greenhouse-materials',
    title: 'Greenhouse Materials',
    icon: '/green_house.svg',
    description: 'Polythene covers, locking profiles, and structural accessories.',
    count: 3,
    gradient: 'from-[#63913D]/10 to-[#8FBB43]/10',
    image: 'https://placehold.co/600x400/63913D/white?text=Greenhouse+Materials',
  },
  {
    id: 'irrigation-systems',
    title: 'Irrigation Systems',
    icon: '/irrigation_systems.svg',
    description: 'Driplines, pipes, and efficient water delivery components.',
    count: 2,
    gradient: 'from-[#57D6F2]/10 to-[#63913D]/10',
    image: 'https://placehold.co/600x400/57D6F2/white?text=Irrigation+Systems',
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

export const allProducts: Product[] = [
  {
    id: 'uv-greenhouse-polythene',
    name: 'Greenhouse Polythene (UV Open/Blocked)',
    category: 'Greenhouse Materials',
    description: 'High-quality, durable polythene designed to optimize light transmission and protect crops from harsh weather.',
    tags: ['UV Treated', 'Durable', '200 Microns'],
    features: ['Optimal light transmission', 'Excellent heat retention', 'Tear and weather resistant', 'Long lifespan (3+ years)'],
    image: 'https://placehold.co/600x400/8FBB43/white?text=UV+Polythene',
  },
  {
    id: 'locking-profiles',
    name: 'Locking Profiles (2m, 4m)',
    category: 'Greenhouse Materials',
    description: 'Galvanized steel locking profiles and zigzag wires for securely fastening polythene and nets to greenhouse structures.',
    tags: ['Galvanized', 'Secure', 'Accessories'],
    features: ['Corrosion resistant galvanized steel', 'Durable PVC coated zigzag wire', 'Easy to install and remove', 'Multiple length options'],
    image: 'https://placehold.co/600x400/8FBB43/white?text=Locking+Profiles',
  },
  {
    id: 'drip-lines',
    name: 'Driplines (0.3mm, 0.4mm)',
    category: 'Irrigation Systems',
    description: 'Precision emitter driplines for highly efficient, localized water delivery directly to the root zone.',
    tags: ['Water Efficient', 'Anti-clogging'],
    features: ['Consistent flow rate', 'High clogging resistance', 'Even water distribution', 'Easy to deploy'],
    image: 'https://placehold.co/600x400/57D6F2/white?text=Driplines',
  },
  {
    id: 'hdpe-pipes',
    name: 'HDPE Pipes & Fittings',
    category: 'Irrigation Systems',
    description: 'High-density polyethylene pipes for durable and leak-proof mainlines and submains in irrigation setups.',
    tags: ['Heavy Duty', 'UV Resistant'],
    features: ['Withstands high pressure', 'Durable and long-lasting', 'Corrosion and chemical resistant', 'Compatible with standard fittings'],
    image: 'https://placehold.co/600x400/57D6F2/white?text=HDPE+Pipes',
  },
  {
    id: 'dam-liners',
    name: 'Dam Liners (0.3mm to 1mm)',
    category: 'Water Management',
    description: 'Premium geomembrane liners for constructing water reservoirs, fish ponds, and conservation tanks.',
    tags: ['Waterproofing', 'Tear Resistant'],
    features: ['High puncture resistance', 'UV stabilized for direct sunlight', 'Custom sizes available', 'Impermeable to water'],
    image: 'https://placehold.co/600x400/324f1f/white?text=Dam+Liners',
  },
  {
    id: 'shade-nets',
    name: 'Shade Nets',
    category: 'Nets & Crop Protection',
    description: 'Knitted agricultural shade nets available in various percentages to protect crops from intense sunlight and heat stress.',
    tags: ['UV Stabilized', 'Breathable'],
    features: ['Various shade percentages (35%, 55%, 75%)', 'Knitted HDPE material', 'Reduces wind speed', 'Helps retain soil moisture'],
    image: 'https://placehold.co/600x400/63913D/white?text=Shade+Nets',
  },
  {
    id: 'insect-nets',
    name: 'Pro Insect Nets',
    category: 'Nets & Crop Protection',
    description: 'Fine mesh netting designed to exclude harmful pests while allowing adequate ventilation and light.',
    tags: ['Pest Control', 'Eco-friendly'],
    features: ['Blocks tiny insects like thrips', 'Excellent ventilation', 'Saves on chemical pesticides', 'Durable construction'],
    image: 'https://placehold.co/600x400/8FBB43/white?text=Insect+Nets',
  },
  {
    id: 'mulch-films',
    name: 'Agricultural Mulch Films',
    category: 'Crop Enhancement Materials',
    description: 'Plastic mulch films that suppress weed growth, conserve soil moisture, and regulate soil temperature for better yields.',
    tags: ['Weed Control', 'Moisture Retention'],
    features: ['Suppresses weed growth', 'Conserves soil moisture', 'Controls soil temperature', 'Prevents soil erosion'],
    image: 'https://placehold.co/600x400/324f1f/white?text=Mulch+Films',
  },
];

export const categoryMap: Record<string, string> = {
  'greenhouse-materials': 'Greenhouse Materials',
  'irrigation-systems': 'Irrigation Systems',
  'water-management': 'Water Management',
  'nets-crop-protection': 'Nets & Crop Protection',
  'crop-enhancement': 'Crop Enhancement Materials',
};

export const reverseCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([k, v]) => [v, k])
);
