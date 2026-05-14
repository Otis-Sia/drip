import { supabase } from './supabase';
export type Region = 'Nairobi & Central' | 'Rift Valley' | 'Eastern & Coast' | 'Western & Nyanza';

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  region: Region;
}

// Empty fallbacks
export const branches: Branch[] = [];

// Supabase Fetches
export async function getBranches(): Promise<Branch[]> {
  const { data, error } = await supabase.from('branches').select('*').order('created_at', { ascending: true });
  if (error || !data) return [];
  return data as Branch[];
}
