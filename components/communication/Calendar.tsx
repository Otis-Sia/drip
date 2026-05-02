import Image from 'next/image';
import { EventItem } from '@/lib/communication';

interface CalendarProps {
  events: EventItem[];
}

export default function Calendar({ events }: CalendarProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Image src="/calendar.svg" alt="" width={22} height={22} />
        <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
      </div>
      <div className="card p-6">
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="bg-gradient-to-br from-[#63913D] to-[#8FBB43] text-white font-bold text-center py-2 px-3 rounded-xl min-w-[60px]">
                <span className="block text-xs uppercase tracking-wider leading-none">
                  {event.date.split(' ')[0]}
                </span>
                <span className="block text-lg leading-tight mt-0.5">
                  {event.date.split(' ')[1]}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm leading-snug">
                  {event.title}
                </h4>
                <span className="text-[11px] font-medium text-[#63913D] uppercase tracking-wider">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
