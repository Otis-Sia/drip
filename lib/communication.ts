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

export const alerts: Alert[] = alertsData.alerts as Alert[];
export const news: NewsItem[] = alertsData.news as NewsItem[];
export const events: EventItem[] = calendarData as EventItem[];
export const resources: ResourceItem[] = resourcesData as ResourceItem[];
