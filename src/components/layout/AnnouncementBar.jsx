import React from 'react';
import { ShieldCheck, Ruler, PhoneCall, Award } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

export const AnnouncementBar = () => {
  return (
    <aside aria-label="Craftsmanship Assurance" className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center space-x-6 flex-wrap justify-center">
          <div className="flex items-center space-x-1.5 text-amber-300">
            <Award className="w-3.5 h-3.5" />
            <span className="font-medium tracking-wide">100% Solid Seasoned Heartwood</span>
          </div>
          <div className="hidden md:flex items-center space-x-1.5 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{APP_CONFIG.WARRANTY_YEARS}-Year Anti-Warpage Guarantee</span>
          </div>
          <div className="hidden lg:flex items-center space-x-1.5 text-stone-300">
            <Ruler className="w-3.5 h-3.5 text-amber-400" />
            <span>Custom Millwork to Any Architectural Opening</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <a
            href={`tel:${APP_CONFIG.SUPPORT_PHONE}`}
            className="flex items-center space-x-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Concierge: {APP_CONFIG.SUPPORT_PHONE}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
