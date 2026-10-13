import React, { useState } from 'react';
import { Eye, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ROOM_ENVIRONMENTS } from '../../utils/constants';
import { PRODUCTS } from '../../data/products';

export const RoomVisualizer = ({ door, onCustomize }) => {
  const [selectedEnvId, setSelectedEnvId] = useState(ROOM_ENVIRONMENTS[0].id);
  const [activeDoorId, setActiveDoorId] = useState(door?.id || PRODUCTS[0].id);

  const activeEnv = ROOM_ENVIRONMENTS.find((e) => e.id === selectedEnvId) || ROOM_ENVIRONMENTS[0];
  const currentDoor = PRODUCTS.find((p) => p.id === activeDoorId) || door || PRODUCTS[0];
  const doorImage = currentDoor ? currentDoor.images[0] : '';

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Visualizer Header */}
      <div className="p-6 md:p-8 border-b border-stone-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Space Simulation</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-900">
            Architectural Door & Frame Visualizer
          </h3>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Preview handcrafted doors and carved side frames mounted against diverse wall textures and lighting conditions.
          </p>
        </div>

        {/* Quick Door Switcher Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase font-bold tracking-wider text-stone-500 block">
            Select Model to Simulate
          </label>
          <select
            value={activeDoorId}
            onChange={(e) => setActiveDoorId(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold bg-stone-50 border border-stone-300 rounded-xl text-stone-800 focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Environment Selector Bar */}
      <div className="px-6 md:px-8 py-3 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-semibold text-stone-600">Interior Environment:</span>
        <div className="flex items-center flex-wrap gap-2">
          {ROOM_ENVIRONMENTS.map((env) => {
            const isSelected = env.id === selectedEnvId;
            return (
              <button
                key={env.id}
                onClick={() => setSelectedEnvId(env.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: env.wallColor }}
                />
                <span>{env.name.split(' ')[0]} {env.name.split(' ')[1]}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visualizer Canvas Area */}
      <div className={`relative h-[520px] md:h-[620px] w-full flex items-center justify-center p-6 overflow-hidden transition-colors duration-500 ${activeEnv.bgClass}`}>
        {/* Ambient Radial Spotlight */}
        <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-black/50 pointer-events-none" />

        {/* Floor Line & Perspective */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 border-t border-black/20"
          style={{
            backgroundColor: activeEnv.floorColor,
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 20px',
            transform: 'perspective(400px) rotateX(25deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Realistic Door Frame Assembly Mockup */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Lintel Wall Shadow */}
          <div className="w-64 md:w-80 h-3 bg-stone-950/20 rounded-t-sm shadow-md" />

          {/* Door Shutter with Casing Shadow */}
          <div className="relative w-56 md:w-72 aspect-1/2 rounded-t-lg overflow-hidden shadow-2xl ring-8 ring-stone-900/40 border-4 border-amber-950/30 bg-stone-800 transition-all duration-300">
            {doorImage ? (
              <img
                src={doorImage}
                alt={currentDoor?.title}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                Door Graphic Preview
              </div>
            )}

            {/* Ambient Lighting Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/15 pointer-events-none" />
          </div>

          {/* Ground Contact Shadow */}
          <div className="w-64 md:w-80 h-4 bg-stone-950/60 blur-md rounded-full -mt-2" />
        </div>

        {/* Atmosphere Spec Box Floating Overlay */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/40 shadow-lg text-[11px] text-stone-800 space-y-0.5">
          <div className="font-bold text-stone-900">{currentDoor?.title}</div>
          <div className="text-stone-500 font-medium">Space: {activeEnv.name}</div>
          <div className="text-stone-400 text-[10px]">Timber: {currentDoor?.woodType}</div>
        </div>

        {/* Customize CTA Overlay Button */}
        {onCustomize && (
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => onCustomize(currentDoor)}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <span>Customize This Design</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
