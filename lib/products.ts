import { supabase } from './supabase';
import categoriesData from './data/categories.json';
import productsData from './data/products.json';

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

// Static Fallbacks
export const categories: Category[] = categoriesData as Category[];
export const allProducts: Product[] = productsData as Product[];

export const categoryMap: Record<string, string> = Object.fromEntries(
  categories.map(c => [c.id, c.title])
);

export const reverseCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([k, v]) => [v, k])
);

// Supabase Fetches
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
  if (error || !data) return categories;
  return data as Category[];
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
  if (error || !data) return allProducts;
  return data.map(p => ({
    ...p,
    category: p.category_id,
    longDescription: p.long_description,
    useCases: p.useCases || [] // Assuming useCases might be in the JSON but not DB yet, handle gracefully
  })) as Product[];
}
