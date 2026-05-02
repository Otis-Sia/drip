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

export const categories: Category[] = categoriesData as Category[];
export const allProducts: Product[] = productsData as Product[];

export const categoryMap: Record<string, string> = Object.fromEntries(
  categories.map(c => [c.id, c.title])
);

export const reverseCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([k, v]) => [v, k])
);
