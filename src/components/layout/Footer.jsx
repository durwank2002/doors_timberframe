import React from 'react';
import { DoorClosed, Shield, Compass, Phone, Mail, MapPin, Award } from 'lucide-react';
import { APP_CONFIG, WOOD_SPECIES_LIST } from '../../utils/constants';

export const Footer = ({ onSelectCategory }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950">
                <DoorClosed className="w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-black text-white tracking-tight">
                {APP_CONFIG.BRAND_NAME}
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Atelier of handcrafted architectural doors and solid wooden frames. Precision kiln-dried seasoned hardwoods engineered for multi-generational longevity.
            </p>
            <div className="flex items-center space-x-2 text-xs text-amber-400 pt-2">
              <Award className="w-4 h-4" />
              <span>FSC Certified Timber & Zero Warpage Guarantee</span>
            </div>
          </div>

          {/* Door Collections */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Architectural Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('main-entrance')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Grand Entrance & Pivot Doors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('pooja-doors')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Hand-Carved Pooja Sanctum Doors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('internal-flush')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Architectural Veneer Flush Doors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('sliding-barn')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Live-Edge & Barn Sliding Doors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('wooden-frames')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Heavy Solid Choukaths & Frames
                </button>
              </li>
            </ul>
          </div>

          {/* Timber Varieties */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Hardwood Species
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              {WOOD_SPECIES_LIST.slice(0, 5).map((wood) => (
                <li key={wood.id} className="flex items-center space-x-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: wood.colorHex }}
                  />
                  <span>{wood.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Atelier & Millwork Concierge
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Woodcraft Boulevard, Timber Yard District, Metro Hub</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${APP_CONFIG.SUPPORT_PHONE}`} className="hover:text-white">
                  {APP_CONFIG.SUPPORT_PHONE}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`} className="hover:text-white">
                  {APP_CONFIG.SUPPORT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} {APP_CONFIG.BRAND_NAME} Millwork Atelier. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Static-First Architecture</span>
            <span>Zero Third-Party Tracking</span>
            <span>SonarQube Grade A Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
