import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/lib/services';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';

interface ServiceSectionProps {
  service: Service;
  index: number;
}

export default function ServiceSection({ service, index }: ServiceSectionProps) {
  return (
    <section
      id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
      className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-start ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
    >
      <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
        <div className="w-16 h-16 rounded-2xl glass-icon flex items-center justify-center mb-5">
          <Image src={service.icon} alt="" width={36} height={36} />
        </div>
        <div className="section-label">{service.tagline}</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-5">{service.title}</h2>

        {/* Problem */}
        <div className="bg-red-50/80 border-l-4 border-red-400/80 p-5 rounded-r-xl mb-6">
          <p className="text-red-800/80 text-sm font-semibold mb-1">The Challenge</p>
          <p className="text-gray-600 text-sm leading-relaxed">{service.problem}</p>
        </div>

        <p className="text-gray-500 leading-relaxed mb-6">{service.approach}</p>

        {/* Outcomes */}
        <div className="bg-[#63913D]/10 border border-[#63913D]/20 rounded-2xl p-5">
          <p className="text-[#63913D] font-semibold text-sm mb-1 flex items-center gap-2">
            <CheckCircleIcon size={20} color="white" />
            Proven Results
          </p>
          <p className="text-[#63913D]/80 text-sm leading-relaxed">{service.outcomes}</p>
        </div>
      </div>

      <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
        {/* Service Image */}
        {service.image && (
          <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6">
            <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        )}
        <div className={`bg-gradient-to-br ${service.gradient} rounded-3xl p-8 border border-gray-100/50`}>
          <h3 className="font-bold text-gray-900 mb-5 text-lg">What&apos;s Included</h3>
          <ul className="space-y-3.5">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircleIcon size={20} />
                <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/contact" className="btn-secondary block text-center" id={`service-cta-${index}`}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
