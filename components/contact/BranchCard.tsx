import Image from 'next/image';
import { Branch } from '@/lib/branches';

interface BranchCardProps {
  branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProps) {
  return (
    <div className="card p-5 hover:border-[#63913D]/30 transition-all duration-300">
      <h4 className="font-bold text-gray-900 text-sm mb-2">{branch.name}</h4>
      <div className="space-y-3 text-xs text-gray-500 font-medium">
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
    </div>
  );
}
