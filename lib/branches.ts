import branchesData from './data/branches.json';

export type Region = 'Nairobi & Central' | 'Rift Valley' | 'Eastern & Coast' | 'Western & Nyanza';

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  region: Region;
}

export const branches: Branch[] = branchesData as Branch[];
