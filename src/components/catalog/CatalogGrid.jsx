import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { SkeletonProductCard } from '../feedback/SkeletonLoader';
import { EmptyState } from '../feedback/EmptyState';

export const CatalogGrid = ({
  products,
  loading = false,
  totalCount,
  onQuickView,
  onCustomize,
  onOpenMobileFilters,
  onResetFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonProductCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Mobile Filters Header Trigger */}
      <div className="flex md:hidden items-center justify-between mb-4">
        <span className="text-xs text-stone-500 font-medium">
          Showing {products.length} of {totalCount} designs
        </span>
        <button
          onClick={onOpenMobileFilters}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-semibold text-stone-700 shadow-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
          <span>Filters</span>
        </button>
      </div>

      {products.length === 0 ? (
        <EmptyState onReset={onResetFilters} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onCustomize={onCustomize}
            />
          ))}
        </div>
      )}
    </div>
  );
};
