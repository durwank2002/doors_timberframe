import React from 'react';
import { DoorClosed, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';

export const EmptyState = ({
  title = 'No doors match your criteria',
  message = 'Try clearing your search terms or relaxing category and price filters to discover our artisan timber catalog.',
  onReset,
}) => {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs max-w-lg mx-auto my-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700">
        <DoorClosed className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-sm text-stone-500 mb-6 leading-relaxed">{message}</p>
      {onReset && (
        <Button variant="primary" size="md" icon={RotateCcw} onClick={onReset}>
          Reset All Filters
        </Button>
      )}
    </div>
  );
};
