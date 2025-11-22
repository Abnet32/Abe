
import React from 'react';
import { Wrench, Settings, Disc, Battery, Droplet, Gauge, Car, ChevronRight } from 'lucide-react';

export const IconPerformance = () => <Gauge size={40} className="text-gray-400 group-hover:text-brand-red transition-colors" strokeWidth={1.5} />;
export const IconTransmission = () => <Settings size={40} className="text-gray-400 group-hover:text-brand-red transition-colors" strokeWidth={1.5} />;
export const IconBrake = () => <Disc size={40} className="text-gray-400 group-hover:text-brand-red transition-colors" strokeWidth={1.5} />;
export const IconEngine = () => <Car size={40} className="text-gray-400 group-hover:text-brand-red transition-colors" strokeWidth={1.5} />;
export const IconTyre = () => <div className="relative"><Disc size={40} className="text-gray-400 group-hover:text-brand-red transition-colors" strokeWidth={1.5} /></div>;
export const IconPaint = () => <Droplet size={40} className="text-gray-400 group-hover:text-brand-red transition-colors" strokeWidth={1.5} />;

export const PlayButton = ({ small = false }: { small?: boolean }) => (
  <div className={`flex items-center justify-center rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors cursor-pointer ${small ? 'w-12 h-12' : 'w-16 h-16'}`}>
    <svg width={small ? "16" : "24"} height={small ? "16" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  </div>
);
