import { supabase } from './supabase';
import servicesData from './data/services.json';
import serviceSummariesData from './data/serviceSummaries.json';

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

// Static Fallbacks
export const services: Service[] = servicesData as Service[];
export const serviceSummaries: ServiceSummary[] = serviceSummariesData as ServiceSummary[];

// Supabase Fetches
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
  if (error || !data) return services;
  return data.map(s => ({
    ...s,
    iconBg: s.icon_bg
  })) as Service[];
}

export async function getServiceSummaries(): Promise<ServiceSummary[]> {
  const { data, error } = await supabase.from('service_summaries').select('*').order('created_at', { ascending: true });
  if (error || !data) return serviceSummaries;
  return data as ServiceSummary[];
}
