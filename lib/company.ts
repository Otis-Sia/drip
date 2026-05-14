import { supabase } from './supabase';
import companyData from './data/company.json';

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface TargetMarket {
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
  name: string;
  role: string;
  department: string;
  bio: string;
  image?: string;
}

// Static Fallbacks
export const companyValues: CompanyValue[] = companyData.companyValues as CompanyValue[];
export const targetMarkets: TargetMarket[] = companyData.targetMarkets as TargetMarket[];
export const companyStats: CompanyStat[] = companyData.companyStats as CompanyStat[];
export const aboutStats: [string, string][] = companyData.aboutStats as [string, string][];
export const socials: SocialLink[] = companyData.socials as SocialLink[];
export const contactInfo: ContactInfoItem[] = companyData.contactInfo as ContactInfoItem[];
export const teamMembers: TeamMember[] = companyData.teamMembers as TeamMember[];

// Supabase Fetches
export async function getCompanyValues(): Promise<CompanyValue[]> {
  const { data, error } = await supabase.from('company_values').select('*').order('created_at', { ascending: true });
  if (error || !data) return companyValues;
  return data as CompanyValue[];
}

export async function getTargetMarkets(): Promise<TargetMarket[]> {
  const { data, error } = await supabase.from('target_markets').select('*').order('created_at', { ascending: true });
  if (error || !data) return targetMarkets;
  return data as TargetMarket[];
}
