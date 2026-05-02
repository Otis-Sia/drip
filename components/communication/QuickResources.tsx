import Image from 'next/image';
import Link from 'next/link';
import { ResourceItem } from '@/lib/communication';

interface QuickResourcesProps {
  resources: ResourceItem[];
}

export default function QuickResources({ resources }: QuickResourcesProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Image src="/chain_link.svg" alt="" width={22} height={22} />
        <h2 className="text-xl font-bold text-gray-900">Quick Resources</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {resources.map((res, index) => (
          <Link
            key={index}
            href={res.link}
            className="card p-5 text-center flex flex-col items-center group"
          >
            <div className="w-12 h-12 rounded-xl glass-icon flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Image src={res.icon} alt="" width={28} height={28} />
            </div>
            <h4 className="font-bold text-gray-900 text-xs mb-1">
              {res.title}
            </h4>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              For {res.target}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
