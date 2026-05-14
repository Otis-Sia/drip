import { supabase } from './supabase';
import branchesData from './data/branches.json';

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

// Static Fallbacks
export const branches: Branch[] = branchesData as Branch[];

// Supabase Fetches
export async function getBranches(): Promise<Branch[]> {
  const { data, error } = await supabase.from('branches').select('*').order('created_at', { ascending: true });
  if (error || !data) return branches;
  return data as Branch[];
}
