import Image from 'next/image';
import { ServiceSummary } from '@/lib/services';

interface ServiceCardProps {
  service: ServiceSummary;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div
      className={`card overflow-hidden group animate-fadeInUp delay-${(index + 1) * 100}`}
    >
      {/* Service Image */}
      {service.image && (
        <div className="relative w-full h-40 overflow-hidden">
          <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
      )}
      <div className="p-7">
        <div className="w-14 h-14 rounded-2xl glass-icon flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          <Image src={service.icon} alt="" width={32} height={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
}
