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
export const aboutStats: [string, string][] = [];

export async function getCompanyStats(): Promise<CompanyStat[]> {
  const { data, error } = await supabase.from('company_stats').select('*').order('created_at', { ascending: true });
  if (error || !data || data.length === 0) return [
    { value: '250+', label: 'Projects Done' },
    { value: '15k+', label: 'Farmers Reached' },
    { value: '16+', label: 'Branches' }
  ];

  return data as CompanyStat[];
}
export const contactInfo: ContactInfoItem[] = [];

export async function getSocials(): Promise<SocialLink[]> {
  const { data, error } = await supabase.from('socials').select('*').order('created_at', { ascending: true });
  if (error || !data || data.length === 0) return [
    { name: "Instagram", href: "https://www.instagram.com/afrodrip254?igsh=MWwwb3BrazhyaWxrcw==", icon: "/instagram.svg" },
    { name: "Facebook", href: "https://www.facebook.com/share/1CiLi5Nef3/", icon: "/facebook.svg" },
    { name: "TikTok", href: "https://www.tiktok.com/@afrodripltd?is_from_webapp=1&sender_device=pc", icon: "/tiktok.svg" }
  ];
  return data as SocialLink[];
}

export async function getContactInfo(): Promise<ContactInfoItem[]> {
  const { data, error } = await supabase.from('contact_info').select('*').order('created_at', { ascending: true });
  if (error || !data || data.length === 0) return [
    { icon: "/email.svg", label: "Email", value: "info@afrodrip.co.ke" },
    { icon: "/phone.svg", label: "Phone", value: "+254 711 506 498" },
    { icon: "/location_pin.svg", label: "Address", value: "Maasai Rd, off Mombasa Rd, Nairobi, Kenya" },
    { icon: "/clock.svg", label: "Business Hours", value: "Mon–Fri, 8:00 AM – 5:00 PM EAT" }
  ];
  return data as ContactInfoItem[];
}

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
