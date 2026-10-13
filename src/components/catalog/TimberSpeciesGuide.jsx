import React from 'react';
import { Award, ShieldCheck, TreePine, Sparkles, ArrowRight } from 'lucide-react';
import { WOOD_SPECIES_LIST } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export const TimberSpeciesGuide = ({ onSelectWoodFilter }) => {
  return (
    <section className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200/90 shadow-xs space-y-8">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="flex items-center space-x-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-2">
          <TreePine className="w-4 h-4" />
          <span>Atelier Materiality</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-black text-stone-900 tracking-tight">
          Hardwood Timber Species & Grain Catalog
        </h2>
        <p className="text-stone-500 text-sm mt-2 leading-relaxed">
          Every door and frame begins with seasoned heartwood. We select timber with natural resin oils and zero synthetic fillers to guarantee longevity and dimensional stability.
        </p>
      </div>

      {/* Grid of Woods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WOOD_SPECIES_LIST.map((wood) => (
          <div
            key={wood.id}
            className="rounded-2xl p-6 border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-amber-600/40 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span
                    className="w-6 h-6 rounded-lg shadow-xs border border-stone-300"
                    style={{ backgroundColor: wood.colorHex }}
                  />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {wood.name}
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {wood.badge}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Geographic Origin:</span>
                  <span className="font-medium text-stone-800">{wood.origin}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Timber Density:</span>
                  <span className="font-mono font-medium text-stone-800">{wood.density}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Shutter Rate Est.:</span>
                  <span className="font-mono font-bold text-amber-800">{formatCurrency(wood.pricePerSqFt)}/sq.ft</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Choukath Frame Est.:</span>
                  <span className="font-mono font-bold text-amber-800">{formatCurrency(wood.frameRatePerRft)}/Rft</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed pt-1">
                {wood.grain}
              </p>
            </div>

            <button
              onClick={() => onSelectWoodFilter(wood.id)}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>View Doors in {wood.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
