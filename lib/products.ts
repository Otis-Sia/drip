import { supabase } from './supabase';
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  specs: { label: string; value: string }[];
  useCases: string[];
  image?: string;
  images?: string[];
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

// Empty fallbacks (will be populated by Supabase)
export const categories: Category[] = [];
export const allProducts: Product[] = [];

export const categoryMap: Record<string, string> = {
  'greenhouse': 'Greenhouse Systems',
  'irrigation': 'Irrigation Solutions',
  'accessories': 'Agricultural Accessories',
  'climate-smart': 'Climate Smart Tech'
};

export const reverseCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([k, v]) => [v, k])
);

// Supabase Fetches
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
  if (error || !data) return [];

  // Deduplicate by title
  const seen = new Set();
  const uniqueData = data.filter(c => {
    const duplicate = seen.has(c.title);
    seen.add(c.title);
    return !duplicate;
  });

  return uniqueData as Category[];
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
  if (error || !data) return [];

  // Deduplicate by name
  const seen = new Set();
  const uniqueData = data.filter(p => {
    const duplicate = seen.has(p.name);
    seen.add(p.name);
    return !duplicate;
  });

  return uniqueData.map(p => ({
    ...p,
    category: p.category_id,
    longDescription: p.long_description,
    useCases: p.useCases || [] // Assuming useCases might be in the JSON but not DB yet, handle gracefully
  })) as Product[];
}
