
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

export const alerts: Alert[] = [
  {
    id: 1,
    title: 'Scheduled System Maintenance',
    content: 'The client portal will be offline on Saturday, May 2nd, from 10:00 PM to 2:00 AM for critical infrastructure upgrades.',
    severity: 'info',
    date: 'April 29, 2026',
  },
  {
    id: 2,
    title: 'Weather Advisory: Heavy Rainfall Expected',
    content: 'Please ensure your greenhouse drainage systems are clear. Heavy rainfall is predicted across the Rift Valley region over the next 48 hours.',
    severity: 'warning',
    date: 'April 28, 2026',
  },
];

export const news: NewsItem[] = [
  {
    id: 1,
    title: 'New Climate-Smart Farming Modules Launched',
    content: 'We have added three new consultation modules focusing on water conservation and organic crop protection.',
    category: 'General',
    date: 'April 25, 2026',
    image: 'https://placehold.co/600x300/63913D/white?text=Climate-Smart+Modules',
  },
  {
    id: 2,
    title: 'Upcoming Agricultural Workshop in Nakuru',
    content: 'Join our agronomists on May 15th for a hands-on workshop on optimizing drip irrigation efficiency.',
    category: 'Clients',
    date: 'April 22, 2026',
    image: 'https://placehold.co/600x300/57D6F2/white?text=Nakuru+Workshop',
  },
  {
    id: 5,
    title: 'Q1 Agricultural Yield Report Released',
    content: 'Our comprehensive analysis of climate-smart farming trends and crop yields for Q1 2026 is now available.',
    category: 'Clients',
    date: 'April 15, 2026',
    image: 'https://placehold.co/600x300/57D6F2/white?text=Q1+Report',
  },
];

export const events: EventItem[] = [
  { date: 'May 05', title: 'Webinar: Optimizing Greenhouse Yields', type: 'Client Event' },
  { date: 'May 18', title: 'Monthly System Maintenance Window', type: 'Maintenance' },
  { date: 'May 25', title: 'Town Hall Meeting', type: 'Company Wide' },
];

export const resources: ResourceItem[] = [
  { title: 'Client Portal', link: '/shop', icon: '/lock.svg', target: 'Clients' },
  { title: 'Knowledge Base', link: '/services', icon: '/knowledge_base.svg', target: 'General' },
  { title: 'Submit a Ticket', link: '/contact', icon: '/ticket.svg', target: 'Clients' },
];
