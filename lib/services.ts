import servicesData from './data/services.json';
import serviceSummariesData from './data/serviceSummaries.json';

export interface Service {
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
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export const services: Service[] = servicesData as Service[];

/** Shorter summaries used on the homepage */
export const serviceSummaries: ServiceSummary[] = serviceSummariesData as ServiceSummary[];
