import Image from 'next/image';
import { TeamMember } from '@/lib/company';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const initials = member.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="card p-6 group text-center">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full mx-auto mb-5 bg-gradient-to-br from-[#63913D] to-[#8FBB43] flex items-center justify-center shadow-lg shadow-green-500/15 group-hover:scale-105 transition-transform duration-300 overflow-hidden relative">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="object-cover" sizes="96px" />
        ) : (
          <span className="text-white text-2xl font-black tracking-wide">{initials}</span>
        )}
      </div>

      <h3 className="font-bold text-gray-900 text-base mb-1">{member.name}</h3>
      <p className="text-[#63913D] text-sm font-semibold mb-1">{member.role}</p>
      <span className="badge-tag !text-[10px] inline-block mb-3">{member.department}</span>
      <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
    </div>
  );
}
