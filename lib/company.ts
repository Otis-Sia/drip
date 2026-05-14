import { supabase } from './supabase';
export interface CompanyValue {
  id?: string;
  icon: string;
  title: string;
  description: string;
}

export interface TargetMarket {
  id?: string;
  icon: string;
  title: string;
  desc: string;
}

export interface CompanyStat {
  value: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image?: string;
}

// Empty fallbacks
export const companyValues: CompanyValue[] = [];
export const targetMarkets: TargetMarket[] = [];
export const companyStats: CompanyStat[] = [];
export const aboutStats: [string, string][] = [
  ['250+', 'Projects Done'],
  ['15k+', 'Farmers Reached'],
  ['16+', 'Branches']
];
export const socials: SocialLink[] = [];
export const contactInfo: ContactInfoItem[] = [];
export const teamMembers: TeamMember[] = [];

// Supabase Fetches
export async function getCompanyValues(): Promise<CompanyValue[]> {
  const { data, error } = await supabase.from('company_values').select('*').order('created_at', { ascending: true });
  if (error || !data || data.length === 0) return [];

  // Deduplicate by title
  const seen = new Set();
  const uniqueData = data.filter(v => {
    const duplicate = seen.has(v.title);
    seen.add(v.title);
    return !duplicate;
  });

  return uniqueData as CompanyValue[];
}

export async function getTargetMarkets(): Promise<TargetMarket[]> {
  const { data, error } = await supabase.from('target_markets').select('*').order('created_at', { ascending: true });
  if (error || !data || data.length === 0) return [];

  // Deduplicate by title
  const seen = new Set();
  const uniqueData = data.filter(m => {
    const duplicate = seen.has(m.title);
    seen.add(m.title);
    return !duplicate;
  });

  return uniqueData as TargetMarket[];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
  if (error || !data || data.length === 0) return [];

  // Deduplicate by name
  const seen = new Set();
  const uniqueData = data.filter(t => {
    const duplicate = seen.has(t.name);
    seen.add(t.name);
    return !duplicate;
  });

  return uniqueData as TeamMember[];
}
