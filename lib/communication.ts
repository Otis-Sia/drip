import { supabase } from './supabase';
import alertsData from './data/alerts.json';
import calendarData from './data/calendar.json';
import resourcesData from './data/resources.json';

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

// Static Fallbacks
export const alerts: Alert[] = alertsData.alerts as Alert[];
export const news: NewsItem[] = alertsData.news as NewsItem[];
export const events: EventItem[] = calendarData as EventItem[];
export const resources: ResourceItem[] = resourcesData as ResourceItem[];

// Supabase Fetches
export async function getAlerts(): Promise<Alert[]> {
  const { data, error } = await supabase.from('alerts').select('*').order('date', { ascending: false });
  if (error || !data) return alerts;
  return data as Alert[];
}

export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
  if (error || !data) return news;
  return data as NewsItem[];
}

export async function getEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase.from('calendar_events').select('*').order('date', { ascending: true });
  if (error || !data) return events;
  return data as EventItem[];
}

export async function getResources(): Promise<ResourceItem[]> {
  const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: true });
  if (error || !data) return resources;
  return data as ResourceItem[];
}
