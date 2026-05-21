import Image from 'next/image';
import { Branch } from '@/lib/branches';

interface BranchCardProps {
  branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProps) {
  let mapSrc = branch.map_url;
  if (mapSrc && mapSrc.includes('<iframe') && mapSrc.includes('src="')) {
    const match = mapSrc.match(/src="([^"]+)"/);
    if (match) mapSrc = match[1];
  }

  return (
    <div className="card overflow-hidden hover:border-primary/30 transition-all duration-300 p-5 flex flex-col">
      <h4 className="font-bold text-fg text-sm mb-2">{branch.name}</h4>
      <div className="space-y-3 text-xs text-muted font-medium mb-4 flex-1">
        <p className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-md glass-icon flex items-center justify-center flex-shrink-0 mt-0.5">
            <Image src="/location_pin.svg" alt="" width={12} height={12} />
          </span>
          <span className="pt-0.5">{branch.address}</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-md glass-icon flex items-center justify-center flex-shrink-0">
            <Image src="/phone.svg" alt="" width={12} height={12} />
          </span>
          <span>{branch.phone}</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-md glass-icon flex items-center justify-center flex-shrink-0">
            <Image src="/email.svg" alt="" width={12} height={12} />
          </span>
          <span className="break-all">{branch.email}</span>
        </p>
      </div>

      {mapSrc && (
        <div className="mt-auto rounded-xl overflow-hidden h-40 relative border border-border">
          <iframe 
            src={mapSrc} 
            className="absolute inset-0 w-full h-full" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
