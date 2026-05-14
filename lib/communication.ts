import { supabase } from './supabase';
export interface Alert {
  id: number;
  title: string;
  content: string;
  severity: 'info' | 'warning' | 'error';
  date: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: 'General' | 'Clients' | 'Staff';
  date: string;
  image?: string;
}

export interface EventItem {
  date: string;
  title: string;
  type: string;
}

export interface ResourceItem {
  title: string;
  link: string;
  icon: string;
  target: string;
}

// Empty fallbacks
export const alerts: Alert[] = [];
export const news: NewsItem[] = [];
export const events: EventItem[] = [];
export const resources: ResourceItem[] = [];

// Supabase Fetches
export async function getAlerts(): Promise<Alert[]> {
  const { data, error } = await supabase.from('alerts').select('*').order('date', { ascending: false });
  if (error || !data) return [];
  return data as Alert[];
}

export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
  if (error || !data) return [];
  return data as NewsItem[];
}

export async function getEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase.from('calendar_events').select('*').order('date', { ascending: true });
  if (error || !data) return [];
  return data as EventItem[];
}

export async function getResources(): Promise<ResourceItem[]> {
  const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: true });
  if (error || !data) return [];
  return data as ResourceItem[];
}
