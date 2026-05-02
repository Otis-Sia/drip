import Image from 'next/image';
import { Alert } from '@/lib/communication';

interface AlertsProps {
  alerts: Alert[];
  hideTitle?: boolean;
}

export default function Alerts({ alerts, hideTitle = false }: AlertsProps) {
  if (alerts.length === 0) return null;

  return (
    <section className="space-y-4">
      {!hideTitle && (
        <div className="flex items-center gap-2 mb-2">
          <Image src="/bell.svg" alt="" width={22} height={22} />
          <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
        </div>
      )}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`glass-card p-6 border-l-4 rounded-r-2xl animate-fadeInUp ${
              alert.severity === 'warning'
                ? 'border-l-amber-500 bg-amber-500/5'
                : alert.severity === 'error'
                ? 'border-l-red-500 bg-red-500/5'
                : 'border-l-[#63913D] bg-[#63913D]/5'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    alert.severity === 'warning'
                      ? 'bg-amber-100 text-amber-800'
                      : alert.severity === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-[#63913D]/10 text-[#63913D]'
                  }`}
                >
                  {alert.severity}
                </span>
                <h3 className="font-bold text-gray-900 mt-2 text-base">
                  {alert.title}
                </h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {alert.date}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {alert.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
