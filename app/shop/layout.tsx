import { notFound } from 'next/navigation';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  // Immediately render Next.js 404 for any /shop route
  notFound();
  // unreachable, but keep the component shape
  return null;
}
