import React from 'react';
import { SlidersHorizontal, Compass, ArrowDown, Sparkles } from 'lucide-react';

export const HeroBanner = ({ onOpenConfigurator, onExploreCatalog, onOpenVisualizer }) => {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-white py-20 lg:py-28 border-b border-stone-800">
      {/* Background Graphic Texture using real carved frame */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage:
            'url("/images/doors/gajalakshmi-carved-choukath-frame.png")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/95 to-amber-950/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl space-y-6">
          {/* Subheading pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Solid Teak Doors & Carved Choukath Side Frames</span>
          </div>

          {/* Main Title updated per user request */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">
            Premium Wooden Doors & Architectural Side Frames.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
            Specializing in bespoke solid teak entrance shutters, sculpted Deepalakshmi double doors, sacred MPT temple bell pooja doors, and hand-carved Gaja-Lakshmi choukaths (door side frames & architraves).
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={onOpenConfigurator}
              className="px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-xl flex items-center justify-center space-x-2.5 transition-all hover:scale-102"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Door & Frame Configurator</span>
            </button>

            <button
              onClick={onOpenVisualizer}
              className="px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center space-x-2.5 transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Experience Room Visualizer</span>
            </button>

            <button
              onClick={onExploreCatalog}
              className="px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-stone-300 hover:text-white flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Explore All Models</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-stone-800/80">
            <div>
              <div className="text-2xl font-serif font-bold text-amber-400">100% Solid</div>
              <div className="text-xs text-stone-400 mt-0.5">Teak & Honne Heartwood</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-amber-400">Side Frames</div>
              <div className="text-xs text-stone-400 mt-0.5">Single & Double Rebate Choukaths</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-amber-400">Hand Carved</div>
              <div className="text-xs text-stone-400 mt-0.5">Deep-Relief Temple Motifs</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-amber-400">Custom Size</div>
              <div className="text-xs text-stone-400 mt-0.5">Millwork to Exact Wall Openings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
