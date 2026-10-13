import React from 'react';

export const SkeletonProductCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 animate-pulse flex flex-col h-full">
      <div className="aspect-4/5 bg-stone-200" />
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-stone-200 rounded" />
            <div className="h-3 w-12 bg-stone-200 rounded" />
          </div>
          <div className="h-5 w-4/5 bg-stone-200 rounded" />
          <div className="h-3 w-full bg-stone-200 rounded" />
          <div className="h-3 w-2/3 bg-stone-200 rounded" />
        </div>
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <div className="h-6 w-24 bg-stone-200 rounded" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 bg-stone-200 rounded-xl" />
            <div className="h-8 bg-stone-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
