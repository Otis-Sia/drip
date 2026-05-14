import { supabase } from './supabase';
export interface Service {
  id?: string;
  icon: string;
  title: string;
  tagline: string;
  problem: string;
  approach: string;
  features: string[];
  outcomes: string;
  gradient: string;
  iconBg: string;
  image?: string;
}

export interface ServiceSummary {
  id?: string;
  icon: string;
  title: string;
  description: string;
  image?: string;
}

// Empty fallbacks
export const services: Service[] = [];
export const serviceSummaries: ServiceSummary[] = [];

// Supabase Fetches
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
  if (error || !data) return [];
  
  // Deduplicate by title
  const seen = new Set();
  const uniqueData = data.filter(s => {
    const duplicate = seen.has(s.title);
    seen.add(s.title);
    return !duplicate;
  });

  return uniqueData.map(s => ({
    ...s,
    iconBg: s.icon_bg
  })) as Service[];
}

export async function getServiceSummaries(): Promise<ServiceSummary[]> {
  const { data, error } = await supabase.from('service_summaries').select('*').order('created_at', { ascending: true });
  if (error || !data) return [];
  
  // Deduplicate by title
  const seen = new Set();
  const uniqueData = data.filter(s => {
    const duplicate = seen.has(s.title);
    seen.add(s.title);
    return !duplicate;
  });

  return uniqueData as ServiceSummary[];
}
